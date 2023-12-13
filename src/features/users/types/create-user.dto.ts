import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(4, { message: "ユーザー名は4文字以上にしてください。" })
  @MaxLength(20, { message: "ユーザー名は20文字以下にしてください。" })
  username: string;

  @IsString()
  @MinLength(8, { message: "パスワードは8文字以上にしてください。" })
  @MaxLength(32, { message: "パスワードは32文字以下にしてください。" })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "パスワードには小文字・大文字・記号を含めてください。",
  })
  password: string;

  @IsEmail({}, { message: "有効なメールアドレスを入力してください。" })
  email: string;

  @IsPhoneNumber("JP", { message: "電話番号を入力してください" })
  phone: string;

  @IsUrl(
    { protocols: ["https"], host_whitelist: ["chat.googleapis.com"] },
    { message: "例)https://chat.googleapis.com/***" }
  )
  chatWebhookUrl: string;
}
