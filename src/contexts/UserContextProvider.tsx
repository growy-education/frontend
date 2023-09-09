import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { User } from "../dto/user.class";
import { AxiosContext } from "./AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Role } from "../dto/enum/role.enum";
import { PendingContextPage } from "../pages/PendingContextPage";
import { TeacherStatus } from "../dto/enum/teacher-status.enum";
import { Teacher } from "../dto/teacher.class";

interface UserContextProps {
  user: User;
  changeTeacherStatus: () => Promise<Teacher | null>;
}

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

  const changeTeacherStatus = useCallback(async () => {
    if (user.role !== Role.TEACHER) {
      return null;
    }
    return axios
      .create(axiosConfig)
      .patch("teachers/me", {
        status:
          user.teacher?.status === TeacherStatus.ACTIVE
            ? TeacherStatus.INACTIVE
            : TeacherStatus.ACTIVE,
      })
      .then((response) => {
        console.log(response.data);
        const savedTeacher = plainToInstance(Teacher, response.data);
        user.teacher = savedTeacher;
        setUser(plainToInstance(User, user));
        return savedTeacher;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }, [axiosConfig, user]);

  if (!!!user) {
    return <PendingContextPage message="ユーザー情報を取得中" />;
  }

  if (user.role === Role.PENDING) {
    return <Typography>ADMINユーザーからの承認を待機中です。</Typography>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        changeTeacherStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
