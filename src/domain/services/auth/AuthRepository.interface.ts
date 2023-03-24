import { User, Session } from "@/domain/models";

export interface AuthRepository {
  register: (credentials: Omit<User, 'id'>) => Promise<Session>;
  login: (credentials: Omit<User, 'id' | 'name'>) => Promise<Session>;
  logout: () => Promise<void>;
};