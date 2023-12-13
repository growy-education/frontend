import { IsNotEmpty, IsString } from "class-validator";

export class SendMessageToAnswerDto {
  @IsNotEmpty({ message: "講師へのメッセージを入力してください" })
  @IsString()
  message: string;
}
