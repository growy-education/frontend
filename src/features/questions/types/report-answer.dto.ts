import { IsNotEmpty, IsString } from "class-validator";

export class ReportAnswerDto {
  @IsNotEmpty({ message: "報告理由を入力してください" })
  @IsString()
  message: string;
}
