import { IsNotEmpty, IsString } from "class-validator";

export class SendMessageToUserDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
