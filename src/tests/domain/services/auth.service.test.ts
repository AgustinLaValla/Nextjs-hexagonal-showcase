import { User } from "@/domain/models";
import { AuthRepository, authService } from "@/domain/services"

describe('UserService Domain Test', () => {

  let service: ReturnType<typeof authService>;
  let mockRepository: AuthRepository

  beforeEach(() => {

    mockRepository = {
      register: jest.fn(),
      login: jest.fn(),
      checkToken: jest.fn(),
      logout: jest.fn()
    }

    service = authService(mockRepository);
  });


  test('It should create a new user and return a session object', async () => {
    const userData: Omit<User, 'id'> = { email: 'test@test.com', name: 'test', password: 'Test@123' };
    const userID = '0123456789';
    const user: User = {
      email: userData.email,
      name: userData.name,
      password: userData.password,
      id: userID,
    };
    const token = 'json-web-token';

    (mockRepository.register as jest.Mock).mockResolvedValue({ user, token });

    const registeredUser = await service.register({ ...userData });

    expect(mockRepository.register).toHaveBeenCalledWith(userData);
    expect(registeredUser.user).toEqual(user);
    expect(registeredUser.token).toEqual(token);
  });

  test('It should login and return a session object', async () => {
    const userData: Omit<User, 'id'> = { email: 'test@test.com', name: 'test', password: 'Test@123' };
    const userID = '0123456789';
    const user: User = {
      email: userData.email,
      name: userData.name,
      password: userData.password,
      id: userID,
    };
    const token = 'json-web-token';

    (mockRepository.login as jest.Mock).mockResolvedValue({ user, token });

    const loggedInUser = await service.login({ email: userData.email, password: userData.password });

    expect(mockRepository.login).toHaveBeenCalledWith({ email: userData.email, password: userData.password });
    expect(loggedInUser.user).toEqual(user);
    expect(loggedInUser.token).toEqual(token);

  })

})