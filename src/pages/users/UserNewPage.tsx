import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { SubmitButton } from "../../components/SubmitButton";
import { UsernameTextField } from "../../components/users/UsernameTextField";
import { EmailTextField } from "../../components/users/EmailTextField";
import { PasswordTextField } from "../../components/users/PasswordTextField";
import { PhoneTextField } from "../../components/users/PhoneTextField";
import { ChatWebhookUrlTextField } from "../../components/users/ChatWebhookUrlTextField";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { UserContext } from "../../contexts/UserContextProvider";
import { User } from "../../dto/user.class";

class CreateUserDto {
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

export const UserNew = () => {
  const navigate = useNavigate();
  const { createUser } = useContext(UserContext);
  const [sending, setSending] = useState(false);

  const resolver = classValidatorResolver(CreateUserDto);
  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
  } = useForm<CreateUserDto>({ resolver });

  const onSubmit: SubmitHandler<CreateUserDto> = (data) => {
    setSending(true);
    createUser(data)
      .then((createdUser) => {
        if (createdUser instanceof User) {
          navigate(`/users/${createdUser.id}`);
          reset();
        }
      })
      .finally(() => setSending(false));
  };

  return (
    <>
      <PageTitleTypography>ユーザーを新規作成する</PageTitleTypography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <HeadlineTypography>ユーザー名</HeadlineTypography>
        <UsernameTextField errors={errors} {...register("username")} />

        <HeadlineTypography>メールアドレス</HeadlineTypography>
        <EmailTextField errors={errors} {...register("email")} />

        <HeadlineTypography>パスワード</HeadlineTypography>
        <PasswordTextField errors={errors} {...register("password")} />

        <HeadlineTypography>電話番号</HeadlineTypography>
        <PhoneTextField errors={errors} {...register("phone")} />

        <HeadlineTypography>GoogleChat Webhook URL(DM)</HeadlineTypography>
        <ChatWebhookUrlTextField
          errors={errors}
          {...register("chatWebhookUrl")}
        />

        <Box margin="0.5em">
          <SubmitButton onClick={handleSubmit(onSubmit)} disabled={sending}>
            {sending ? "送信中..." : "送信する"}
          </SubmitButton>
        </Box>
      </Box>
    </>
  );
};
