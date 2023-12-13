import { ArrayMinSize, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Subject } from "../../../domains/subject.enum";
import { ImageEntity } from "../../images/types/image.class";

export class CreateQuestionDto {
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

  @ArrayMinSize(1, {
    message: "問題画像を選択してください",
  })
  @IsNotEmpty({ each: true, message: "問題画像に問題があります" })
  problems: (null | ImageEntity)[];

  @ArrayMinSize(1, {
    message: "解答画像を選択してください",
  })
  @IsNotEmpty({
    each: true,
    message: "解答画像に問題があります",
  })
  solutions: (null | ImageEntity)[];
}
