import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { Question } from "../types/question.class";
import { plainToInstance } from "class-transformer";
import { TaskStatus } from "../../tasks/types/task-status.enum";

type RejectQuestionVariables = {
  questionId: string;
};

export const rejectQuestion = async ({
  questionId,
}: RejectQuestionVariables): Promise<Question> => {
  return axios
    .post(`questions/${questionId}/confirm`, {
      status: TaskStatus.REJECTED,
    })
    .then((response) => {
      return plainToInstance(Question, response.data);
    });
};

type UseRejectQuestionOptions = {
  options?: MutationOptions<typeof rejectQuestion>;
};

export const useRejectQuestion = ({
  options,
}: UseRejectQuestionOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (question) => {
      set({
        type: "success",
        title: "質問を拒否しました",
      });
      await queryClient.invalidateQueries({
        queryKey: ["questions", question.id],
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "質問を拒否できませんでした",
      });
    },
    mutationFn: rejectQuestion,
    ...options,
  });
};
