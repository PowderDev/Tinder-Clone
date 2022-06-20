import { User } from "./user";

export interface Notification {
  id: number;
  from: User;
  toId: number;
  fromId: number;
}
