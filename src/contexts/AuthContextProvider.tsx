import React, { useState, useEffect, createContext, useContext } from "react";
import { GoogleCredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { CircularProgress } from "@mui/material";

import { LoginScreen } from "../SignIn";

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

export function useAuthContext() {
  return useContext(AuthContext);
}

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [bearerToken, setBearerToken] = useState<string>("");

  useEffect(() => {
    // ページが読み込まれた際に保存されたBearer Tokenを取得
    const savedToken = localStorage.getItem("bearerToken");

    if (savedToken) {
      setBearerToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    console.log("email:", email, "password:", password);
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/password`, {
        email,
        password,
      })
      .then((response) => {
        console.log("Backendから得られたデータ", response.data);
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
    console.log("Googleログインで得られたデータ", response);
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/google`, {
        token: response.credential,
      })
      .then((response) => {
        console.log("Backendから得られたデータ", response.data);
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
    console.log(email, password);
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth`, {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log("Backendから得られたデータ", response.data);
      })
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
        <LoginScreen
          handleEmailPasswordLogin={handleLogin}
          handleGoogleLogin={handleGoogleLogin}
          handleSignup={handleSignup}
        />
      )}
    </AuthContext.Provider>
  );
};
