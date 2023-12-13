import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Question } from "../types/question.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { QuestionStatus } from "../types/question-status.enum";

type CancelQuestionVariables = {
  questionId: string;
};

export const cancelQuestion = async ({
  questionId,
}: CancelQuestionVariables): Promise<Question> => {
  return axios
    .patch(`questions/${questionId}/status`, {
      status: QuestionStatus.CANCELED,
    })
    .then((response) => {
      return plainToInstance(Question, response.data);
    });
};

type UseCancelQuestionOptions = {
  options?: MutationOptions<typeof cancelQuestion>;
};

export const useCancelQuestion = ({
  options,
}: UseCancelQuestionOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (question) => {
      navigate(`/questions/${question.id}`);
      set({
        type: "success",
        title: "質問をキャンセルしました",
      });
      await queryClient.invalidateQueries({
        queryKey: ["questions", question.id],
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "質問のキャンセルに失敗しました",
      });
    },
    mutationFn: cancelQuestion,
    ...options,
  });
};
