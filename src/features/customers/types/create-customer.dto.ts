import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from "class-validator";
import { Relationship } from "./relationship.enum";
import { CustomerService } from "./customer-service.enum";

export class CreateCustomerDto {
  @IsOptional()
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

  @IsEnum(Relationship, { message: "続柄を選択してください" })
  relationship: Relationship;

  @IsArray()
  @ArrayMinSize(1, { message: "サービスは1つ以上選択してください" })
  @IsEnum(CustomerService, {
    each: true,
  })
  services: CustomerService[];

  @IsUrl(
    { protocols: ["https"], host_whitelist: ["chat.googleapis.com"] },
    {
      message: "有効なURLを入力してください 例）https://chat.googleapis.com/~~",
    }
  )
  spaceWebhookUrl: string;
}
