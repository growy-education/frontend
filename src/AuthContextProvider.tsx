import React, { useState, useEffect, createContext, useContext } from "react";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { LoginScreen } from "./SignIn";
import { CircularProgress } from "@mui/material";

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

  const handleLogin = (email: string, password: string) => {
    console.log("email:", email, "password:", password);
    axios
      .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/password`, {
        email,
        password,
      })
      .then((response) => {
        console.log("Backendから得られたデータ", response.data);
        setBearerToken(response.data.accessToken);
        setIsLoggedIn(true);
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
        setBearerToken(response.data.accessToken);
        setIsLoggedIn(true);
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
