import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
  useRef,
} from "react";
import axios from "axios";
import { AxiosContext } from "./AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Teacher } from "../dto/teacher.class";
import { PendingContextPage } from "../pages/PendingContextPage";
import { UserContext } from "./UserContextProvider";
import { Role } from "../dto/enum/role.enum";

interface TeacherContextProps {
  teachers: Teacher[];
  getTeacherById: (id: string) => Promise<Teacher | null>;
  updateTeacherById: (id: string, teacher: Teacher) => Promise<Teacher | null>;
}

export const TeacherContext = createContext<TeacherContextProps>(null);

interface Props {
  children: React.ReactNode;
}

export const TeacherContextProvider = ({ children }: Props) => {
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
          return null;
        });
    },
    [addTeacher, axiosConfig, teachers]
  );

  const updateTeacherById = useCallback(
    (id: string, teacher: Teacher) => {
      return axios
        .create(axiosConfig)
        .patch(`teachers/${id}`, {
          teacher,
        })
        .then((response) => {
          const savedTeacher = plainToInstance(Teacher, response.data);
          updateTeacher(teacher);
          return savedTeacher;
        })
        .catch((error) => null);
    },
    [axiosConfig, updateTeacher]
  );

  if (pending) {
    return <PendingContextPage message="講師情報を取得中" />;
  }

  return (
    <TeacherContext.Provider
      value={{
        teachers,
        getTeacherById,
        updateTeacherById,
      }}
    >
      {children}
    </TeacherContext.Provider>
  );
};
