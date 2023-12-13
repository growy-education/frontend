import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { QuestionStatus } from "../types/question-status.enum";
import { plainToInstance } from "class-transformer";
import { Question } from "../types/question.class";

type ConfirmQuestionVariables = {
  questionId: string;
};

export const confirmQuestion = async ({
  questionId,
}: ConfirmQuestionVariables): Promise<Question> => {
  return axios
    .post(`questions/${questionId}/confirm`, {
      status: QuestionStatus.ASSIGNED,
    })
    .then((response) => {
      return plainToInstance(Question, response.data);
    });
};

type UseConfirmQuestionOptions = {
  options?: MutationOptions<typeof confirmQuestion>;
};

export const useConfirmQuestion = ({
  options,
}: UseConfirmQuestionOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (question: Question) => {
      set({
        type: "success",
        title: "質問を確認しました",
      });
      await queryClient.invalidateQueries({
        queryKey: ["questions", question.id],
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "質問の確認に失敗しました",
      });
    },
    mutationFn: confirmQuestion,
    ...options,
  });
};
