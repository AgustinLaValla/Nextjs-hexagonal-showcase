import { AuthRepository } from "./AuthRepository.interface";
import { User } from "@/domain/models";

export const authService = (authRepository: AuthRepository) => ({
  register: (credentials: Omit<User, 'id'>) => authRepository.register(credentials),
  login: (credentials: Omit<User, 'id' | 'name'>) => authRepository.login(credentials),
  logout: () => authRepository.logout(),
  checkToken: (token?: string) => authRepository.checkToken(token)
})