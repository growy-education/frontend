import { Type } from "class-transformer";
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
import dayjs from "dayjs";

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "お名前を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "お名前（フリガナ）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  firstNameKana: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "苗字を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "苗字（フリガナ）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  lastNameKana: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "小学校名を入力してください" })
  school: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "塾名を入力してください" })
  juku: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "塾の校舎名を入力してください" })
  jukuBuilding: string;

  @IsOptional()
  @IsNotEmpty({ message: "学年を入力してください" })
  @IsIn(["1", "2", "3", "4", "5", "6"], {
    message: "学年は半角英数字で入力してください",
  })
  grade: string;

  // format string to Date
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  birthday: dayjs.Dayjs;
}
