import { Session, User } from "@/domain/models";
import { AuthRepository } from "@/domain/services";
import { http } from "@/infrastucture/adapters";
import { authApi } from "@/infrastucture/apis";

export const authClientRepository: AuthRepository = ({

  register: (credentials: Omit<User, 'id'>) =>
    http.post<Session>(authApi, '/register', credentials),

  login: (credentials: Omit<User, 'id' | 'name'>) =>
    http.post<Session>(authApi, '/login', credentials),

  logout: async () => { },

  checkToken: () => http.get<Session>(authApi, '/validate-token')
})