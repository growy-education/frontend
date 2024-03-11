import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
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

import { AttentionBox } from "./features/lp/price/AttentionBox";
import { AttentionTitleTypography } from "./features/lp/price/AttentionTitleTypography";
import { AttentionDescriptionBox } from "./features/lp/price/AttentionDescriptionBox";
import { AttentionDescriptionTypography } from "./features/lp/price/AttentionDescriptionTypography";
import { AsteriskTypography } from "./features/lp/price/AsteriskTypography";
import { LineLinkTypography } from "./components/Element/Typography/LineLinkTypography";
import { GoogleChatLinkTypography } from "./components/Element/Typography/GoogleChatLinkTypography";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useLoginWithPassword } from "./features/auth/api/loginWithPassword";
import { useLoginWithGoogle } from "./features/auth/api/loginWithGoogle";
import { SubmitButton } from "./features/SubmitButton";

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

export const SignInScreen = () => {
  const navigate = useNavigate();
  const mutationPasswordLogin = useLoginWithPassword();
  const mutationGoogleLogin = useLoginWithGoogle();

  const [errorText, setErrorText] = useState("");

  const resolver = classValidatorResolver(SigninWithPasswordDto);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninWithPasswordDto>({ resolver });

  const onSubmit: SubmitHandler<SigninWithPasswordDto> = (data) => {
    mutationPasswordLogin.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const handleGoogleLogin = (response: GoogleCredentialResponse) => {
    mutationGoogleLogin.mutate(
      { response },
      {
        onError: () => {
          setErrorText(
            "Googleログインに失敗しました。運営までお問い合わせください。"
          );
        },
      }
    );
  };

  const handleGoogleLoginError = () => {};

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box p={2} sx={{ minHeight: "10rem" }}>
        <Box p={2}>
          <img
            src="/img/logo-min.png"
            alt="ロゴ"
            style={{
              width: "10rem",
            }}
          />
        </Box>

        <Typography align="center" fontSize="1.5rem" fontWeight="bold">
          Growyにログインする
        </Typography>

        <Box p={2} display="flex" justifyContent="center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={handleGoogleLoginError}
            size="large"
          />
        </Box>

        {errorText === "" && (
          <Box mx={3}>
            <Typography color={"error"}>
              Googleログインに失敗しました。
              <br />
              運営までお問い合わせください。
              {errorText}
            </Typography>
          </Box>
        )}

        <AttentionBox>
          <AttentionTitleTypography width="12rem">
            ログインにお困りの方へ...
          </AttentionTitleTypography>
          <AttentionDescriptionBox>
            <AsteriskTypography />
            <AttentionDescriptionTypography>
              「Growyでログイン」と表示される方も、表示されているボタンを押してください。
            </AttentionDescriptionTypography>
          </AttentionDescriptionBox>
          <AttentionDescriptionBox>
            <AsteriskTypography />
            <AttentionDescriptionTypography>
              GrowyのGoogleアカウント（@growy.education）でログインしてください。
            </AttentionDescriptionTypography>
          </AttentionDescriptionBox>
          <AttentionDescriptionBox>
            <AsteriskTypography />
            <AttentionDescriptionTypography>
              お困りの方は
              <LineLinkTypography />
              または
              <GoogleChatLinkTypography />
              でスタッフまでお問合せください。
            </AttentionDescriptionTypography>
          </AttentionDescriptionBox>
        </AttentionBox>
        <Box mt={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography>ホームページに戻る</Typography>
          </Button>
        </Box>

        {process.env.REACT_APP_STAGE === "dev" && (
          <Box mt={2}>
            <Typography>デバッグ用ログイン</Typography>
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
                <SubmitButton sx={{ mt: 2 }}>ログイン</SubmitButton>
              </Box>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};
