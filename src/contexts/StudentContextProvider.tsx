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
import { Student } from "../dto/student.class";
import { PendingContextPage } from "../pages/PendingContextPage";
import { UserContext } from "./UserContextProvider";
import { Role } from "../dto/enum/role.enum";
import { error } from "console";
import { AlertSnackbarContext } from "./AlertSnackbarContext";

interface StudentContextProps {
  students: Student[];
  getStudentById: (id: string) => Promise<Student | null>;
  updateStudentById: (
    id: string,
    student: Partial<Student>
  ) => Promise<Student | null>;
}

export const StudentContext = createContext<StudentContextProps>(null);

interface Props {
  children: React.ReactNode;
}

export const StudentContextProvider = ({ children }: Props) => {
  const { handleAxiosError } = useContext(AlertSnackbarContext);
  const { axiosConfig } = useContext(AxiosContext);
  const { user } = useContext(UserContext);

  const [pending, setPending] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    if (user.role === Role.ADMIN) {
      axios
        .create(axiosConfig)
        .get("students")
        .then((response) => {
          if (!Array.isArray(response.data)) {
            throw new Error("ネットワークエラー");
          }
          const students = response.data.map((studentJson: string) => {
            return plainToInstance(Student, studentJson);
          });
          setStudents(students);
        })
        .catch((error) => {
          console.log(
            `error occurred at: ${StudentContextProvider.name}`,
            error
          );
          handleAxiosError(error);
        })
        .finally(() => setPending(false));
    } else {
      setPending(false);
    }
  }, [axiosConfig, handleAxiosError, user.role]);

  const sortStudents = (a: Student, b: Student) =>
    b.createdAt.getTime() - a.createdAt.getTime();

  const addStudent = useCallback(
    async (addedStudent: Student) => {
      setStudents([...students, addedStudent].sort(sortStudents));
    },
    [students]
  );

  const updateStudent = useCallback(
    async (updatedStudent: Student) => {
      const index = students.findIndex(
        (student) => student.id === updatedStudent.id
      );
      if (index === -1) {
        addStudent(updatedStudent);
      } else {
        const newStudents = students.map((student) => {
          if (student.id === updatedStudent.id) {
            return updatedStudent;
          }
          return student;
        });
        setStudents(newStudents);
      }
    },
    [addStudent, students]
  );

  const getStudentById = useCallback(
    async (id: string): Promise<Student | null> => {
      const found = students.find((student) => student.id === id);
      if (found) {
        return found;
      }

      return axios
        .create(axiosConfig)
        .get(`/students/${id}`)
        .then((response) => {
          const student = plainToInstance(Student, response.data);
          addStudent(student);
          return student;
        })
        .catch((error) => {
          handleAxiosError(error);
          return error;
        });
    },
    [addStudent, axiosConfig, handleAxiosError, students]
  );

  const updateStudentById = useCallback(
    async (id: string, student: Partial<Student>) => {
      return axios
        .create(axiosConfig)
        .put(`students/${id}`, student)
        .then((response) => {
          const savedStudent = plainToInstance(Student, response.data);
          updateStudent(savedStudent);
          return savedStudent;
        })
        .catch((error) => {
          handleAxiosError(error);
          return error;
        });
    },
    [axiosConfig, handleAxiosError, updateStudent]
  );

  if (pending) {
    return <PendingContextPage message="生徒情報を取得中" />;
  }

  return (
    <StudentContext.Provider
      value={{
        students,
        getStudentById,
        updateStudentById,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};
