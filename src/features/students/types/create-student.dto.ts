import {
  IsDate,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { Gender } from "./gender.enum";
import { Type } from "class-transformer";
import dayjs from "dayjs";

export class CreateStudentDto {
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

  @IsEnum(Gender, { message: "性別を選択してください" })
  gender: Gender;

  @IsString()
  @IsNotEmpty({ message: "小学校名を入力してください" })
  school: string;

  @IsString()
  @IsNotEmpty({ message: "塾名を入力してください" })
  juku: string;

  @IsString()
  @IsNotEmpty({ message: "塾の校舎名を入力してください" })
  jukuBuilding: string;

  @IsNotEmpty({ message: "学年を入力してください" })
  @IsIn(["4", "5", "6"], {
    message: "学年は半角英数字で入力してください",
  })
  grade: string;

  // format string to Date
  @Type(() => Date)
  @IsDate()
  birthday: dayjs.Dayjs;
}
