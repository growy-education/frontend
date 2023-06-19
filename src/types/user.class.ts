import { Type } from "class-transformer";
import { Role } from "./role.enum";

export class User {
  id: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Date)
  updatedAt: Date;

  username: string;
  email: string;
  phone: string;
  role: Role;
}
