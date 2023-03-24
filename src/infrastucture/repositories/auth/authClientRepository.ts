import { Session, User } from "@/domain/models";
import { AuthRepository } from "@/domain/services";
import { http } from "@/infrastucture/adapters";
import { authApi } from "@/infrastucture/apis";

export const authClientRepository: AuthRepository = ({

  register: async (credentials: Omit<User, 'id'>) =>
    await http.post<Session>(authApi, '/auth/register', credentials),

  login: async (credentials: Omit<User, 'id' | 'name'>) =>
    await http.post<Session>(authApi, '/auth/login', credentials),

  logout: async () => { }
})