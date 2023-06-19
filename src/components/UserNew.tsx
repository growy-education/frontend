import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";

import { AxiosContext } from "../AxiosContextProvider";
import { QuestionTitle } from "./QuestionTitle";

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
    formState: { errors },
  } = useForm<CreateUserDto>({ resolver });

  const onSubmit = (data) => {
    console.log(data);
    setOpen(true);
  };

  // 確認ダイアログ
  const [open, setOpen] = useState(false);

  // ダイアログの確認ボタンを押すと、ユーザーの一覧画面へと遷移する
  const handleConfirm = () => {
    setOpen(false);
    navigate("/users"); // 詳細画面への遷移
  };

  return (
    <>
      <Typography variant="h4">ユーザーを新規作成する</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <QuestionTitle title="ユーザー名" />
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

        <QuestionTitle title="メールアドレス" />
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

        <QuestionTitle title="パスワード" />
        <TextField
          fullWidth
          id="user"
          label="パスワード"
          error={!!errors.password}
          helperText={
            errors.password
              ? errors.password.message
              : "英数小文字・大文字、そして記号を含む8文字以上。"
          }
          {...register("password")}
        />
        <Box margin="0.5em">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
          >
            送信
          </Button>
        </Box>
      </form>
      {/* ダイアログ */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>ユーザーが作成されました</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ユーザーの一覧画面へと遷移しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            確認
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
