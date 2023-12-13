import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { QueryOptions } from "../../../tools/react-query";
import { axios } from "../../../tools/axios";
import { Question } from "../types/question.class";

type GetQuestionVariables = {
  questionId: string;
};

export const getQuestion = async ({
  questionId,
}: GetQuestionVariables): Promise<Question> => {
  return axios.get(`/questions/${questionId}`).then((response) => {
    return plainToInstance(Question, response.data);
  });
};

type UseQuestionOptions = {
  questionId: string;
  options?: QueryOptions<typeof getQuestion>;
};

export const useQuestion = ({ questionId, options }: UseQuestionOptions) => {
  return useQuery({
    queryKey: ["questions", questionId],
    queryFn: () => getQuestion({ questionId }),
    ...options,
  });
};
