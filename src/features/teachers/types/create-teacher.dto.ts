import { IsNotEmpty, IsNumberString, IsString, Matches } from "class-validator";

export class CreateTeacherDto {
  @IsString()
  @IsNotEmpty({ message: "ユーザーを選択してください" })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: "お名前を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: "お名前（フリガナ）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  firstNameKana: string;

  @IsString()
  @IsNotEmpty({ message: "苗字を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: "苗字（フリガナ）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  lastNameKana: string;

  @IsNotEmpty({ message: "ChatworkIDを入力してください" })
  @IsNumberString({}, { message: "ChatworkIDは数字で入力してください" })
  chatworkAccountId: string;
}
