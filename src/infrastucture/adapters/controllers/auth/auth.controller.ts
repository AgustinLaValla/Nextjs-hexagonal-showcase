import { NextApiRequest, NextApiResponse } from "next";
import { authService as authServerService } from "@/domain/services";
import { User } from "@/infrastucture/database/schemas";
import { authServerRepository } from "@/infrastucture/repositories/auth/authServer.repository";
import { ErrorWidthCode } from "@/domain/models";
import { throw500Error } from "@/infrastucture/utils";

const service = authServerService(authServerRepository(User));

export const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await service.register(req.body);
    return res.status(201).json(session);
  } catch (error) {
    if (error instanceof ErrorWidthCode) {
      return res.status(error.code).json(error.message);
    }
    return throw500Error(res);
  }
}

export const login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await service.login(req.body);
    return res.status(200).json(session);
  } catch (error) {
    if (error instanceof ErrorWidthCode) {
      return res.status(error.code).json(error.message);
    }
    return throw500Error(res);
  }
  
}

export const checkToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.cookies.token || req.headers.authorization;
    const session = await service.checkToken(token);
    return res.status(200).json(session);

  } catch (error) {
    if (error instanceof ErrorWidthCode) {
      return res.status(error.code).json(error.message);
    }
    return throw500Error(res);
  }
}