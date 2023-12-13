import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { Subject } from "../../../domains/subject.enum";

export class UpdateQuestionDto {
  @IsIn([Subject.MATHEMATICS, Subject.SCIENCE], {
    message: "科目を選択してください",
  })
  subject: Subject.MATHEMATICS | Subject.SCIENCE;

  @IsNotEmpty({ message: "タイトルを入力してください" })
  @IsString()
  title: string;

  @IsNotEmpty({ message: "質問内容を入力してください" })
  @IsString()
  content: string;

  @IsNotEmpty({ message: "備考を入力してください" })
  @IsString()
  memo: string;
}
