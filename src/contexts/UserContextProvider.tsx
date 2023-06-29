import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { User } from "../types/user.class";
import { AxiosContext } from "./AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Role } from "../types/role.enum";
import { LoadingData } from "../components/LoadingData";

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
    return <LoadingData message="ユーザー情報を取得中" />;
  }

  if (user.role === Role.PENDING) {
    return <Typography>ADMINユーザーからの承認を待機中です。</Typography>;
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
