import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { QueryOptions } from "../../../tools/react-query";
import { axios } from "../../../tools/axios";
import { Student } from "../types/student.class";

type GetStudentVariables = {
  studentId: string;
};

export const getStudent = async ({
  studentId,
}: GetStudentVariables): Promise<Student> => {
  return axios.get(`/students/${studentId}`).then((response) => {
    return plainToInstance(Student, response.data);
  });
};

type UseStudentOptions = {
  studentId: string;
  options?: QueryOptions<typeof getStudent>;
};

export const useStudent = ({ studentId, options }: UseStudentOptions) => {
  return useQuery({
    queryKey: ["students", studentId],
    queryFn: () => getStudent({ studentId }),
    ...options,
  });
};
