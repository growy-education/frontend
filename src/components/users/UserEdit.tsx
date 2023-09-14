import { useContext, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../dto/user.class";
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { Alert, Box, Button, Snackbar, TextField } from "@mui/material";
import { SubmitButton } from "../SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { UsernameTextField } from "./UsernameTextField";
import { EmailTextField } from "./EmailTextField";
import { PhoneTextField } from "./PhoneTextField";
import { ChatWebhookUrlTextField } from "./ChatWebhookUrlTextField";
import { HeadEditBox } from "../HeadEditBox";
import { CancelEditButton } from "../components/CancelEditButton";
import { UserContext } from "../../contexts/UserContextProvider";
import { SaveEditButton } from "../components/SaveEditButton";

class UpdateUserDto {
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

type UserEditProps = {
  user: User;
};

export const UserEdit = ({ user }: UserEditProps) => {
  const navigate = useNavigate();
  const { editUserById } = useContext(UserContext);

  const sending = useRef(false);

  const resolver = classValidatorResolver(UpdateUserDto);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver,
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      chatWebhookUrl: user?.chatWebhookUrl || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateUserDto> = (data) => {
    if (sending.current) {
      return;
    }
    sending.current = true;
    editUserById(user.id, data)
      .then((found) => {
        if (found instanceof User) {
          navigate(`/users/${found.id}`);
          reset();
        }
      })
      .finally(() => {
        sending.current = false;
      });
  };

  return (
    <>
      <HeadEditBox>
        <CancelEditButton onClick={() => navigate(`/users/${user.id}`)} />
        <SaveEditButton
          onClick={handleSubmit(onSubmit)}
          disabled={sending.current}
        />
      </HeadEditBox>

      <HeadlineTypography>ユーザー名</HeadlineTypography>
      <UsernameTextField errors={errors} {...register("username")} />

      <HeadlineTypography>メールアドレス</HeadlineTypography>
      <EmailTextField errors={errors} {...register("email")} />

      <HeadlineTypography>電話番号</HeadlineTypography>
      <PhoneTextField errors={errors} {...register("phone")} />

      <HeadlineTypography>GoogleChat Webhook URL(DM)</HeadlineTypography>
      <ChatWebhookUrlTextField
        errors={errors}
        {...register("chatWebhookUrl")}
      />
    </>
  );
};
