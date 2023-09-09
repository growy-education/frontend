import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { GoogleCredentialResponse } from "@react-oauth/google";
import { CircularProgress } from "@mui/material";

import { SignInScreen } from "../SignIn";
import { createAxiosConfig } from "./AxiosContextProvider";
import { PendingContextPage } from "../pages/PendingContextPage";

interface AuthContextProps {
  isLoggedIn: boolean;
  bearerToken: string;
  handleEmailPasswordLogin: (email: string, password: string) => void;
  handleGoogleLogin: (response: GoogleCredentialResponse) => void;
  handleSignup: (username: string, email: string, password: string) => void;
  handleLogout: () => void;
}

const defaultAuthContext: AuthContextProps = {
  isLoggedIn: false,
  handleEmailPasswordLogin: (email: string, passoword: string) => {},
  handleGoogleLogin: (response: GoogleCredentialResponse) => {},
  handleSignup: (username: string, email: string, password: string) => {},
  handleLogout: () => {},
  bearerToken: "",
};

export const AuthContext = createContext<AuthContextProps>(defaultAuthContext);

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [pending, setPending] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [bearerToken, setBearerToken] = useState<string>("");

  useEffect(() => {
    // ページが読み込まれた際に保存されたBearer Tokenを取得
    const savedToken = localStorage.getItem("bearerToken");

    // Bearer Tokenがあるとき
    if (savedToken) {
      // バックエンドと通信して保存されたbearerTokenが有効かチェック
      // 有効であれば、bearerTokenとして値を保持する
      axios
        .create(createAxiosConfig(savedToken))
        .get("/auth/check")
        .then((response) => {
          setBearerToken(savedToken);
          setIsLoggedIn(true);
        })
        .catch((_error) => {
          setBearerToken("");
          setIsLoggedIn(false);
        });
    }
    setPending(false);
  }, []);

  const handleLogin = (email: string, password: string) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/password`, {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.accessToken;
        setBearerToken(token);
        setIsLoggedIn(true);
        // Bearer Tokenを保存
        localStorage.setItem("bearerToken", token);
      })
      .catch((error) => {
        console.log("AuthContextProviderのエラー:", error);
      });
  };

  const handleGoogleLogin = (response: GoogleCredentialResponse) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/google`, {
        token: response.credential,
      })
      .then((response) => {
        const token = response.data.accessToken;
        setBearerToken(token);
        setIsLoggedIn(true);
        // Bearer Tokenを保存
        localStorage.setItem("bearerToken", token);
      })
      .catch((error) => {
        console.log("AuthContextProviderのエラー:", error);
      });
  };

  const handleSignup = (username: string, email: string, password: string) => {
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth`, {
        username,
        email,
        password,
      })
      .then((response) => {})
      .catch((error) => {
        console.log("AuthContextProviderのエラー:", error);
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setBearerToken("");
    // Bearer Tokenを削除
    localStorage.removeItem("bearerToken");
    // ログアウト時のリダイレクト先URLを指定
    window.location.href = "/";
  };

  if (pending) {
    return <PendingContextPage message="ログイン情報を取得中です" />;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        handleEmailPasswordLogin: handleLogin,
        handleGoogleLogin,
        handleSignup,
        handleLogout,
        bearerToken,
      }}
    >
      {isLoggedIn ? (
        bearerToken === "" ? (
          <CircularProgress />
        ) : (
          children
        )
      ) : (
        <SignInScreen
          handleEmailPasswordLogin={handleLogin}
          handleGoogleLogin={handleGoogleLogin}
          handleSignup={handleSignup}
        />
      )}
    </AuthContext.Provider>
  );
};
