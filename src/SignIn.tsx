import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";

import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";

type LoginScreenProps = {
  handleEmailPasswordLogin: (email: string, password: string) => void;
  handleGoogleLogin: (response: GoogleCredentialResponse) => void;
  handleSignup: (username: string, email: string, password: string) => void;
};

export class SigninWithPasswordDto {
  @IsNotEmpty({ message: "メールアドレスを入力してください" })
  @IsEmail({}, { message: "正しいメールアドレスを入力してください" })
  email: string;

  @MinLength(8, { message: "パスワードは8文字以上です" })
  @MaxLength(32, { message: "パスワードは32文字以下です" })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: "パスワードは英数小文字・大文字・記号を含む8文字以上です",
  })
  password: string;
}

export const LoginScreen = ({
  handleEmailPasswordLogin,
  handleGoogleLogin,
  handleSignup,
}: LoginScreenProps) => {
  const [googleLoginError, setGoogleLoginError] = useState("");

  const resolver = classValidatorResolver(SigninWithPasswordDto);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninWithPasswordDto>({ resolver });

  const onSubmit: SubmitHandler<SigninWithPasswordDto> = (data) => {
    console.log(data);
    handleEmailPasswordLogin(data.email, data.password);
  };

  const handleGoogleLoginError = () => {
    setGoogleLoginError("GoogleLoginに失敗しました。");
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} style={{ padding: "24px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Growyにログイン
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={handleGoogleLoginError}
                size="large"
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              component="form"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              gap={2}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                type="email"
                label="メールアドレス"
                variant="outlined"
                id="email"
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
                {...register("email")}
              />
              <TextField
                id="password"
                label="パスワード"
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
                {...register("password")}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginTop: "16px" }}
              >
                ログイン
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
