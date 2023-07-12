import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
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
      <Typography variant="h4">ユーザーを新規作成する</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <HeadlineTypography>ユーザー名</HeadlineTypography>
        <TextField
          fullWidth
          id="username"
          label="ユーザー名"
          error={!!errors.username}
          helperText={
            !!errors.username
              ? errors.username.message
              : "英数小文字・大文字、そして記号を含む8文字以上。"
          }
          {...register("username")}
        />

        <HeadlineTypography>メールアドレス</HeadlineTypography>
        <TextField
          fullWidth
          id="email"
          autoComplete="email"
          label="メールアドレス"
          error={!!errors.email}
          helperText={
            errors.email
              ? errors.email.message
              : "有効なメールアドレスを入力してください"
          }
          {...register("email")}
        />

        <HeadlineTypography>パスワード</HeadlineTypography>
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          error={!!errors.password}
          helperText={
            errors.password
              ? errors.password.message
              : "英数小文字・大文字、そして記号を含む8文字以上。"
          }
          {...register("password")}
        />
        <HeadlineTypography>電話番号</HeadlineTypography>
        <TextField
          fullWidth
          id="phone"
          label="電話番号"
          error={!!errors.phone}
          helperText={
            errors.phone
              ? errors.phone.message
              : "電話番号を半角英数字で入力してください。"
          }
          {...register("phone")}
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
