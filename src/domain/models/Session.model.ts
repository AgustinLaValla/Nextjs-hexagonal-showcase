import { User } from "./User/User.model";

export interface Session {
  token: string;
  user: User;
}