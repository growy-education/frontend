import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { AxiosContext } from "./AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Teacher } from "../dto/teacher.class";
import { PendingContextPage } from "../pages/PendingContextPage";
import { UserContext } from "./UserContextProvider";
import { Role } from "../dto/enum/role.enum";
import { AlertSnackbarContext } from "./AlertSnackbarContext";

interface TeacherContextProps {
  teachers: Teacher[];
  getTeachers: () => void;
  getTeacherById: (id: string) => Promise<Teacher | null>;
  updateTeacherById: (
    id: string,
    teacher: Partial<Teacher>
  ) => Promise<Teacher | null>;
}

export const TeacherContext = createContext<TeacherContextProps>(null);

interface Props {
  children: React.ReactNode;
}

export const TeacherContextProvider = ({ children }: Props) => {
  const { handleAxiosError } = useContext(AlertSnackbarContext);
  const { axiosConfig } = useContext(AxiosContext);
  const { user } = useContext(UserContext);

  const [pending, setPending] = useState(true);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    if (user.role === Role.ADMIN) {
      axios
        .create(axiosConfig)
        .get("teachers")
        .then((response) => {
          console.log("取得したTeachers:", response.data);
          if (!Array.isArray(response.data)) {
            throw new Error("ネットワークエラー");
          }
          const teachers = response.data.map((userJson: string) => {
            return plainToInstance(Teacher, userJson);
          });
          setTeachers(teachers);
        })
        .catch((error) =>
          console.log(
            `error occurred at: ${TeacherContextProvider.name}`,
            error
          )
        )
        .finally(() => setPending(false));
    } else {
      setPending(false);
    }
  }, [axiosConfig, user.role]);

  const sortTeachers = (a: Teacher, b: Teacher) =>
    b.createdAt.getTime() - a.createdAt.getTime();

  const addTeacher = useCallback(
    async (addedTeacher: Teacher) => {
      setTeachers([...teachers, addedTeacher].sort(sortTeachers));
    },
    [teachers]
  );

  const addTeachers = useCallback(
    async (addedTeachers: Teacher[]) => {
      if (addedTeachers.length === 0) {
        return;
      }
      for (const addedTeacher of addedTeachers) {
        const index = teachers.findIndex(
          (teacher) => teacher.id === addedTeacher.id
        );
        if (index === -1) {
          teachers.push(addedTeacher);
        } else {
          teachers[index] = addedTeacher;
        }
      }
      setTeachers([...teachers]);
    },
    [teachers]
  );

  const updateTeacher = useCallback(
    async (updatedTeacher: Teacher) => {
      const index = teachers.findIndex(
        (teacher) => teacher.id === updatedTeacher.id
      );
      if (index === -1) {
        addTeacher(updatedTeacher);
      } else {
        const newTeachers = teachers.map((teacher) => {
          if (teacher.id === updatedTeacher.id) {
            return updatedTeacher;
          }
          return teacher;
        });
        setTeachers(newTeachers);
      }
    },
    [addTeacher, teachers]
  );

  const getTeachers = useCallback(() => {
    axios
      .create(axiosConfig)
      .get("teachers")
      .then((response) => {
        console.log("取得したTeachers:", response.data);
        if (!Array.isArray(response.data)) {
          throw new Error("ネットワークエラー");
        }
        const retrievedTeachers = response.data.map((userJson: string) => {
          return plainToInstance(Teacher, userJson);
        });
        addTeachers(retrievedTeachers);
      })
      .catch((error) => {
        console.log(`error occurred at: ${TeacherContextProvider.name}`, error);
        handleAxiosError(error);
        return error;
      })
      .finally(() => setPending(false));
  }, [addTeachers, axiosConfig, handleAxiosError]);

  const getTeacherById = useCallback(
    async (id: string): Promise<Teacher | null> => {
      const found = teachers.find((teacher) => teacher.id === id);
      if (found) {
        return found;
      }

      return axios
        .create(axiosConfig)
        .get(`/teachers/${id}`)
        .then((response) => {
          const teacher = plainToInstance(Teacher, response.data);
          addTeacher(teacher);
          return teacher;
        })
        .catch((error) => {
          handleAxiosError(error);
          return error;
        });
    },
    [addTeacher, axiosConfig, handleAxiosError, teachers]
  );

  const updateTeacherById = useCallback(
    async (id: string, teacher: Partial<Teacher>) => {
      return axios
        .create(axiosConfig)
        .patch(`teachers/${id}`, teacher)
        .then((response) => {
          const savedTeacher = plainToInstance(Teacher, response.data);
          updateTeacher(savedTeacher);
          return savedTeacher;
        })
        .catch((error) => {
          handleAxiosError(error);
          return error;
        });
    },
    [axiosConfig, handleAxiosError, updateTeacher]
  );

  if (pending) {
    return <PendingContextPage message="講師情報を取得中" />;
  }

  return (
    <TeacherContext.Provider
      value={{
        teachers,
        getTeachers,
        getTeacherById,
        updateTeacherById,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
