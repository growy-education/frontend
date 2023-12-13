import { plainToInstance } from "class-transformer";
import { useQuery } from "@tanstack/react-query";

import { Lesson } from "../types/lesson.class";
import { axios } from "../../../tools/axios";
import { QueryOptions } from "../../../tools/react-query";
// import { GetLessonsFilterDto } from "../../../domains/lesson/get-lessons-filter.dto";

// type GetLessonsVariables = {
//   filterDto?: GetLessonsFilterDto;
// };

export const getLessons = async (): Promise<Lesson[]> => {
  return axios.get(`/lessons`).then((response) => {
    if (!Array.isArray(response.data)) {
      throw new Error(`Server response is not valid`);
    }
    return plainToInstance(Lesson, response.data);
  });
};

type UseLessonsOptions = {
  // filterDto?: GetLessonsFilterDto;
  options?: QueryOptions<typeof getLessons>;
};

export const useLessons = ({ options }: UseLessonsOptions = {}) => {
  return useQuery({
    queryKey: ["lessons"],
    queryFn: () => getLessons(),
    ...options,
  });
};
