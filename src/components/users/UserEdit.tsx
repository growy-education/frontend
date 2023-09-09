import { useState } from "react";
import { useParams } from "react-router-dom";
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
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  onSuccess: () => void;
};

export const UserEdit = ({ user, onCancel, onSuccess }: UserEditProps) => {
  const { axiosConfig } = useAxiosConfig();
  const { userId } = useParams();

  // 結果を示すオブジェクトを作成する
  const [result, setResult] = useState({
    open: false,
    success: false,
    title: "",
    message: "",
  });

  const resolver = classValidatorResolver(UpdateUserDto);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
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
    axios
      .create(axiosConfig)
      .put(`users/${userId}`, data)
      .then((response) => {
        onSuccess();
      })
      .catch((error: unknown) => {
        if (isAxiosError(error)) {
          // サーバーからの返答がある
          if (error.response) {
            if (error.response.status === 409) {
              if (process.env.REACT_APP_STAGE === "dev") {
                console.log(error.message);
              }
              setError("email", {
                message: "メールアドレスが既に登録されています",
              });
              return setResult({
                open: true,
                success: false,
                title: "",
                message: "メールアドレスが既に登録されています",
              });
            }
            return setResult({
              open: true,
              success: false,
              title: "",
              message: "ユーザーのデータに誤りがあります",
            });
          }
          // サーバーからの返答がない
          if (error.request) {
            return setResult({
              open: true,
              success: false,
              title: "",
              message:
                "サーバーからの返答がありません。ネットワーク接続を確認してください",
            });
          }
        }

        // よくわからんエラーのとき
        return setResult({
          open: true,
          success: false,
          title: "",
          message: "予期せぬエラーが発生しました",
        });
      });
  };

  return (
    <>
      <HeadEditBox>
        <CancelEditButton onClick={onCancel} />
        <SubmitButton onClick={handleSubmit(onSubmit)} trigger={trigger} />
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

      {result.open && !result.success && (
        <Snackbar
          open={result.open && !result.success}
          autoHideDuration={6000}
          onClose={() =>
            setResult({
              open: false,
              success: false,
              title: "",
              message: "",
            })
          }
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() =>
              setResult({
                open: false,
                success: false,
                title: "",
                message: "",
              })
            }
            severity="error"
            sx={{ width: "100%" }}
          >
            {result.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
