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

type LoginScreenProps = {
  handleEmailPasswordLogin: (email: string, password: string) => void;
  handleGoogleLogin: (response: GoogleCredentialResponse) => void;
  handleSignup: (username: string, email: string, password: string) => void;
};

type ScreenType = "signin" | "signup";

export const LoginScreen = ({
  handleEmailPasswordLogin,
  handleGoogleLogin,
  handleSignup,
}: LoginScreenProps) => {
  const [screenType, setScreenType] = useState<ScreenType>("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    handleEmailPasswordLogin(email, password);
  };

  const handleGoogleLoginError = () => {
    setErrorMessage("Googleログインに失敗しました。");
  };

  if (screenType === "signin") {
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
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  type="password"
                  label="パスワード"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "16px" }}
                  onClick={handleLogin}
                >
                  ログイン
                </Button>
                <Box alignContent={"center"}>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleLoginError}
                  />
                </Box>
                {errorMessage && (
                  <Typography variant="body2" color="error">
                    {errorMessage}
                  </Typography>
                )}
                <Typography variant="body2">
                  アカウントがない場合は、
                  <Button onClick={() => setScreenType("signup")}>
                    アカウント登録
                  </Button>
                  してください。
                </Typography>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  } else {
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
                Growyにサインアップ
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <TextField
                  type="text"
                  label="ユーザー名"
                  variant="outlined"
                  value={username}
                  onChange={handleUsernameChange}
                />
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={handleEmailChange}
                />
                <TextField
                  type="password"
                  label="パスワード"
                  variant="outlined"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "16px" }}
                  onClick={() => handleSignup(username, email, password)}
                >
                  アカウント登録
                </Button>
                <Box alignContent={"center"}>
                  <Typography variant="body2">
                    既にアカウントをお持ちの場合は、
                    <Button onClick={() => setScreenType("signin")}>
                      サインイン
                    </Button>
                    してください。
                  </Typography>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
};
