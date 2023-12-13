import { IsNotEmpty, IsString } from "class-validator";

export class SendMessageToCustomerDto {
  @IsNotEmpty()
  @IsString()
  message: string;
}
