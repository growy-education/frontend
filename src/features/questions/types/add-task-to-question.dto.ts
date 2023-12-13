import { IsNotEmpty, IsString } from "class-validator";

export class AddTaskToQuestionDto {
  @IsNotEmpty({ message: "タスクタイトルを入力してください" })
  @IsString()
  title: string;
}
