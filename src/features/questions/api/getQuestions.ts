import { plainToInstance } from "class-transformer";
import { useQuery } from "@tanstack/react-query";

import { Question } from "../types/question.class";
import { axios } from "../../../tools/axios";
import { QueryOptions } from "../../../tools/react-query";
import { GetQuestionsFilterDto } from "../types/get-questions-filter.dto";

type GetQuestionsVariables = {
  filterDto?: GetQuestionsFilterDto;
};

export const getQuestions = async ({
  filterDto,
}: GetQuestionsVariables): Promise<Question[]> => {
  return axios.get(`/questions`, { params: filterDto }).then((response) => {
    if (!Array.isArray(response.data)) {
      throw new Error(`Server response is not valid`);
    }
    return plainToInstance(Question, response.data);
  });
};

type UseQuestionsOptions = {
  filterDto?: GetQuestionsFilterDto;
  options?: QueryOptions<typeof getQuestions>;
};

export const useQuestions = ({
  filterDto,
  options,
}: UseQuestionsOptions = {}) => {
  return useQuery({
    queryKey: ["questions", filterDto],
    queryFn: () => getQuestions({ filterDto }),
    initialData: [],
    ...options,
  });
};
