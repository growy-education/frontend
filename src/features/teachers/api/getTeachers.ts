import { plainToInstance } from "class-transformer";
import { Teacher } from "../types/teacher.class";
import { axios } from "../../../tools/axios";
import { useQuery } from "@tanstack/react-query";
import { QueryOptions } from "../../../tools/react-query";

// type GetTeachersVariables = {};

export const getTeachers = async (): Promise<Teacher[]> => {
  return axios.get(`/teachers`).then((response) => {
    if (!Array.isArray(response.data)) {
      throw new Error(`Server response is not valid`);
    }
    return plainToInstance(Teacher, response.data);
  });
};

type UseTeachersOptions = {
  options?: QueryOptions<typeof getTeachers>;
};

export const useTeachers = ({ options }: UseTeachersOptions = {}) => {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: () => getTeachers(),
    ...options,
  });
};
