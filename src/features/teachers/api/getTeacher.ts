import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { QueryOptions } from "../../../tools/react-query";
import { axios } from "../../../tools/axios";
import { Teacher } from "../types/teacher.class";

type GetTeacherVariables = {
  teacherId: string;
};

export const getTeacher = async ({
  teacherId,
}: GetTeacherVariables): Promise<Teacher> => {
  return axios.get(`/teachers/${teacherId}`).then((response) => {
    return plainToInstance(Teacher, response.data);
  });
};

type UseTeacherOptions = {
  teacherId: string;
  options?: QueryOptions<typeof getTeacher>;
};

export const useTeacher = ({ teacherId, options }: UseTeacherOptions) => {
  return useQuery({
    queryKey: ["teachers", teacherId],
    queryFn: () => getTeacher({ teacherId }),
    ...options,
  });
};
