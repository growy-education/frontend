import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(4, { message: "ユーザー名は4文字以上にしてください。" })
  @MaxLength(20, { message: "ユーザー名は20文字以下にしてください。" })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: "有効なメールアドレスを入力してください。" })
  email?: string;

  @IsOptional()
  @IsPhoneNumber("JP", { message: "電話番号を入力してください" })
  phone?: string;

  @IsOptional()
  @IsUrl(
    { protocols: ["https"], host_whitelist: ["chat.googleapis.com"] },
    { message: "例)https://chat.googleapis.com/***" }
  )
  chatWebhookUrl: string;
}
