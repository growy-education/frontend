import { IsNotEmpty, IsString } from "class-validator";

export class ReportQuestionDto {
  @IsNotEmpty({ message: "報告理由を入力してください" })
  @IsString()
  reportMessage: string;
}
