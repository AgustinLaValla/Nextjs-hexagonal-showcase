import { Model } from "mongoose";
import { ErrorWidthCode, User } from "@/domain/models";
import { AuthRepository } from "@/domain/services";
import { MongoDocument } from "@/infrastucture/database/common/mongoDocument.interface"
import { IUser } from "@/infrastucture/database/schemas";
import { db } from "@/infrastucture/database";
import { jwt, crypto } from "@/infrastucture/adapters";
import { config } from "@/config";
import { isValidEmail } from "@/infrastucture/utils";


type UserDocument = MongoDocument<IUser>;

const mapToDomain = (user: UserDocument): User => ({
  name: user.name,
  email: user.email,
  // password: user.password,
  id: user._id
})

export const authServerRepository = (userModel: Model<IUser>): AuthRepository => ({

  register: async ({ name, email, password }: Omit<User, 'id'>) => {

    if (!name || !email || !password)
      throw new ErrorWidthCode('All fields are required', 400);

    await db.connect();

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (user) {
      await db.disconnect();
      throw new ErrorWidthCode('User Already Exists', 409);
    };

    if (!isValidEmail(email)) {
      await db.disconnect();
      throw new ErrorWidthCode('Invalid email', 400);
    }

    const hashedPassword = crypto.hash(password, 10);

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    const domainUser = mapToDomain(newUser);
    const token = await jwt.sign(domainUser, config.jwtSecret, 60 * 60);

    await db.disconnect();

    return {
      user: domainUser,
      token
    }

  },
  login: async ({ email, password }: Omit<User, 'id' | 'name'>) => {

    if (!email || !password)
      throw new ErrorWidthCode('All fields are required', 400);

    await db.connect();

    const user = await userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      await db.disconnect();
      throw new ErrorWidthCode('Not found', 404);
    }

    const isPasswordValid = crypto.compare(password, user.password);
    if (!isPasswordValid) {
      await db.disconnect();
      throw new ErrorWidthCode('Invalid credentials', 400);
    }

    const domainUser = mapToDomain(user);
    const token = await jwt.sign(domainUser, config.jwtSecret, 60 * 60);

    await db.disconnect();

    return {
      user: domainUser,
      token
    }
  },

  logout: async () => { },

  checkToken: async (token?: string) => {
    try {
      const payload = await jwt.verify<User>(token || '', config.jwtSecret);

      const userPayload = {
        email: payload.email,
        id: payload.id,
        name: payload.name,
      }

      const newToken = await jwt.sign(userPayload, config.jwtSecret, 60 * 60);

      return {
        user: userPayload,
        token: newToken,
      }

    } catch (error) {

      const messages = {
        'ERR_JWT_EXPIRED': 'Token has expired. Please, login againg',
        'ERR_JWS_SIGNATURE_VERIFICATION_FAILED': 'Invalid token',
      }

      const noTokenProvidedMsg = 'No token provided';

      throw new ErrorWidthCode(messages[(error as any).code as keyof typeof messages] || noTokenProvidedMsg, 401);
    }
  }
})