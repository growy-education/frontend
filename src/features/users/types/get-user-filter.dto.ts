import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Role } from "./role.enum";

export class GetUsersFilterDto {
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
