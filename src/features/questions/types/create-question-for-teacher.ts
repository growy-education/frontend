import { IsString, IsUUID } from "class-validator";
import { CreateQuestionDto } from "./create-question.dto";

export class CreateQuestionForTeacherDto extends CreateQuestionDto {
  @IsString({ message: "講師を選択してください" })
  @IsUUID("4", { message: "講師を選択してください" })
  teacherId: string;
}
