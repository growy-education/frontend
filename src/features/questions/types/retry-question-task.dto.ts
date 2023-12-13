import { IsNotEmpty, IsString } from "class-validator";

export class RetryQuestionTaskDto {
  @IsNotEmpty({ message: "動画の修正点を入力してください" })
  @IsString()
  retryMessage: string;
}
