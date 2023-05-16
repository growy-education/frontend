import React from "react";
import { Button } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";

export const GoogleLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse);
    },
    flow: "auth-code",
    scope: "email profile openid https://www.googleapis.com/auth/drive",
  });

  return <Button onClick={() => login()}>ログインするじょ〜</Button>;
};
