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

import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import axios, { isAxiosError } from "axios";
import { SubmitButton } from "../../components/SubmitButton";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";
import { ResultSnackbar } from "../../components/ResultSnackbar";
import { UsernameTextField } from "../../components/users/UsernameTextField";
import { EmailTextField } from "../../components/users/EmailTextField";
import { PasswordTextField } from "../../components/users/PasswordTextField";
import { PhoneTextField } from "../../components/users/PhoneTextField";
import { ChatWebhookUrlTextField } from "../../components/users/ChatWebhookUrlTextField";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";

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
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const resolver = classValidatorResolver(CreateUserDto);
  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
  } = useForm<CreateUserDto>({ resolver });

  // 結果を示すオブジェクトを作成する
  const [result, setResult] = useState({
    open: false,
    success: false,
    title: "",
    message: "",
  });

  const onSubmit: SubmitHandler<CreateUserDto> = (data) => {
    axios
      .create(axiosConfig)
      .post("users", {
        ...data,
      })
      .then((response) => {
        setResult({
          open: true,
          success: true,
          title: "ユーザーの作成が完了しました",
          message: "ユーザーの一覧画面へ遷移しますか？",
        });
      })
      .catch((error: unknown) => {
        if (isAxiosError(error)) {
          // サーバーからの返答がある
          if (error.response) {
            if (error.response.status === 409) {
              console.log(error.message);
              setError("email", {
                message: "メールアドレスが既に登録されています",
              });
              return setResult({
                open: true,
                success: false,
                title: "ユーザーの作成に失敗しました",
                message: "メールアドレスが既に登録されています",
              });
            }
            return setResult({
              open: true,
              success: false,
              title: "ユーザーの作成に失敗しました",
              message: "ユーザーのデータに誤りがあります",
            });
          }
          // サーバーからの返答がない
          if (error.request) {
            return setResult({
              open: true,
              success: false,
              title: "ユーザーの作成に失敗しました",
              message:
                "サーバーからの返答がありません。ネットワーク接続を確認してください。",
            });
          }
        }

        // よくわからんエラーのとき
        return setResult({
          open: true,
          success: false,
          title: "ユーザーの作成に失敗しました",
          message: "予期せぬエラーが発生しました",
        });
      });
  };

  // ダイアログの確認ボタンを押すと、ユーザーの一覧画面へと遷移する
  const handleConfirm = () => {
    setResult({ open: false, success: false, title: "", message: "" });
    navigate("/users"); // 詳細画面への遷移
  };

  const handleCancel = () => {
    setResult({ open: false, success: false, title: "", message: "" });
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
          <SubmitButton onClick={handleSubmit(onSubmit)} trigger={trigger} />
        </Box>
      </Box>

      {result.open && result.success && (
        <ConfirmationDialog
          title={result.title}
          message={result.message}
          open={result.open}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {result.open && !result.success && (
        <ResultSnackbar
          severity="error"
          open={result.open}
          title={result.title}
          message={result.message}
          onClose={() =>
            setResult({
              open: false,
              success: false,
              title: "",
              message: "",
            })
          }
        />
      )}
    </>
  );
};
