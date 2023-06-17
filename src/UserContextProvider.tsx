import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { LoginScreen } from "./SignIn";
import { CircularProgress, Typography } from "@mui/material";
import { User } from "./types/user.class";
import { AxiosContext } from "./AxiosContextProvider";
import { plainToClass, plainToInstance } from "class-transformer";

interface UserContextProps {
  user: User;
}

const defaultUserContext: UserContextProps = null;

export const UserContext = createContext<UserContextProps>(null);

export function useUserContext() {
  return useContext(UserContext);
}

interface Props {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const { axiosConfig } = useContext(AxiosContext);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("users/me")
      .then((response) => {
        console.log(response.data);
        const user = plainToInstance(User, response.data);
        setUser(user);
      })
      .catch((error) =>
        console.log(`error occurred at: ${UserContextProvider.name}`, error)
      );
  }, [axiosConfig]);

  if (!!!user) {
    return <Typography>"ユーザー情報を取得中"</Typography>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
