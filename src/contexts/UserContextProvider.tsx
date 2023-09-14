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
import { AlertSnackbarContext } from "./AlertSnackbarContext";

interface UserContextProps {
  user: User;
  users: User[];
  createUser: (user: Partial<User>) => Promise<User>;
  getUserById: (userId: string) => Promise<User>;
  editUserById: (userId: string, updateUserDto: Partial<User>) => Promise<User>;
  changeTeacherStatus: () => Promise<Teacher | null>;
}

export const UserContext = createContext<UserContextProps>(null);
interface Props {
  children: React.ReactNode;
}

export const UserContextProvider = ({ children }: Props) => {
  const { axiosConfig } = useContext(AxiosContext);
  const { handleAxiosError } = useContext(AlertSnackbarContext);

  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("users/me")
      .then((response) => {
        const user = plainToInstance(User, response.data);
        setUser(user);
      })
      .catch((error) => {
        console.log(`error occurred at: ${UserContextProvider.name}`, error);
        handleAxiosError(error);
      });
  }, [axiosConfig, handleAxiosError]);

  useEffect(() => {
    if (user && user.role === Role.ADMIN) {
      axios
        .create(axiosConfig)
        .get("users")
        .then((response) => {
          console.log(response.data);
          const users = response.data.map((userJson: string) =>
            plainToInstance(User, userJson)
          );
          setUsers(users);
        })
        .catch((error) => {
          console.log("error occurred at UsersList.tsx", error);
          handleAxiosError(error);
        });
    }
  }, [axiosConfig, handleAxiosError, user]);

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
        const savedTeacher = plainToInstance(Teacher, response.data);
        user.teacher = savedTeacher;
        setUser(plainToInstance(User, user));
        return savedTeacher;
      })
      .catch((error) => {
        return null;
      });
  }, [axiosConfig, user]);

  const addUser = useCallback(
    async (addedUser: User) => {
      setUsers([...users, addedUser]);
    },
    [users]
  );

  const updateUser = useCallback(
    async (updatedUser: User) => {
      const index = users.findIndex((user) => user.id === updatedUser.id);
      if (index === -1) {
        addUser(updatedUser);
      } else {
        users[index] = updatedUser;
        setUsers([...users]);
      }
    },
    [addUser, users]
  );

  const addUsers = useCallback(
    async (addedUsers: User[]) => {
      if (addedUsers.length === 0) {
        return;
      }
      for (const addedUser of addedUsers) {
        const index = users.findIndex((user) => user.id === addedUser.id);
        if (index === -1) {
          users.push(addedUser);
        } else {
          users[index] = addedUser;
        }
      }
      setUsers([...users]);
    },
    [users]
  );

  const getUsers = useCallback(async (): Promise<User[]> => {
    return axios
      .create(axiosConfig)
      .get("users")
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("ネットワークエラー");
        }
        const retrievedUsers = response.data.map((userJson: string) => {
          return plainToInstance(User, userJson);
        });
        console.log("retrieved", retrievedUsers);
        addUsers(retrievedUsers);
        return retrievedUsers;
      })
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  }, [addUsers, axiosConfig, handleAxiosError]);

  const createUser = useCallback(
    async (user: Partial<User>) => {
      return axios
        .create(axiosConfig)
        .post("users", user)
        .then((response) => {
          const createdUser = plainToInstance(User, response.data);
          addUser(createdUser);
          return createdUser;
        })
        .catch((error) => {
          handleAxiosError(error);
          return error;
        });
    },
    [addUser, axiosConfig, handleAxiosError]
  );

  const getUserById = useCallback(
    async (id: string): Promise<User | null> => {
      const found = users.find((user) => user.id === id);
      if (found) {
        return found;
      }

      return axios
        .create(axiosConfig)
        .get(`/users/${id}`)
        .then((response) => {
          const user = plainToInstance(User, response.data);
          addUser(user);
          return user;
        })
        .catch((error) => {
          handleAxiosError(error);
          return error;
        });
    },
    [addUser, axiosConfig, handleAxiosError, users]
  );

  const editUserById = useCallback(
    async (id: string, updateUserDto: Partial<User>): Promise<User> => {
      return axios
        .create(axiosConfig)
        .patch(`users/${id}`, updateUserDto)
        .then((response) => {
          const user = plainToInstance(User, response.data);
          updateUser(user);
          return user;
        })
        .catch((error) => {
          handleAxiosError(error);
          return error;
        });
    },
    [axiosConfig, handleAxiosError, updateUser]
  );

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
        users,
        createUser,
        getUserById,
        editUserById,
        changeTeacherStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
