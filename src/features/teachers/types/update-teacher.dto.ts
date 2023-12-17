import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { TeacherStatus } from "./teacher-status.enum";
import { Subject } from "../../../domains/subject.enum";

export class UpdateTeacherDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "お名前を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "お名前（フリガナ）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  firstNameKana?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "苗字を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "苗字（フリガナ）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  lastNameKana?: string;

  @IsOptional()
  @IsNotEmpty({ message: "ChatworkIDを入力してください" })
  @IsNumberString({}, { message: "ChatworkIDは数字で入力してください" })
  chatworkAccountId?: string;

  @IsOptional()
  @IsEnum(Subject, { each: true })
  subjects?: Subject[];

  @IsOptional()
  @IsEnum(TeacherStatus, { message: "ステータスを選択してください" })
  status?: TeacherStatus;
}
