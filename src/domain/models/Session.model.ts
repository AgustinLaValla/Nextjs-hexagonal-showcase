import { User } from "./User/User.model";

export interface Session extends User {
  token: string;
}