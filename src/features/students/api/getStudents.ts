import { plainToInstance } from "class-transformer";
import { useQuery } from "@tanstack/react-query";

import { Student } from "../types/student.class";
import { axios } from "../../../tools/axios";
import { QueryOptions } from "../../../tools/react-query";

// type GetStudentsVariables = {};

export const getStudents = async (): Promise<Student[]> => {
  return axios.get(`/students`).then((response) => {
    if (!Array.isArray(response.data)) {
      throw new Error(`Server response is not valid`);
    }
    return plainToInstance(Student, response.data);
  });
};

type UseStudentsOptions = {
  options?: QueryOptions<typeof getStudents>;
};

export const useStudents = ({ options }: UseStudentsOptions = {}) => {
  return useQuery({
    queryKey: ["students"],
    queryFn: () => getStudents(),
    ...options,
  });
};
