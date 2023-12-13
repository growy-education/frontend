import { IsEnum, IsNotEmpty } from "class-validator";
import { Role } from "./role.enum";

export class ActivateUserDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}
