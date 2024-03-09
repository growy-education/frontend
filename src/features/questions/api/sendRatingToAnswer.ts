import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { QuestionAnswerRatingDto } from "../types/answer-rating.dto";

type SendRatingToAnswerVariables = {
  questionId: string;
  answer: string;
  dto: QuestionAnswerRatingDto;
};

export const sendRatingToAnswer = async ({
  questionId,
  answer,
  dto,
}: SendRatingToAnswerVariables): Promise<void> => {
  return axios.post(`questions/${questionId}/answers/${answer}/rating`, dto);
};

type UseSendRatingToAnswerOptions = {
  options?: MutationOptions<typeof sendRatingToAnswer>;
};

export const useSendRatingToAnswer = ({
  options,
}: UseSendRatingToAnswerOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["questions", variables.questionId],
      });
      set({
        type: "success",
        title:
          typeof variables.dto?.rating === "number"
            ? "評価しました。講師の励みになりますので、今後もお願いいたします。"
            : "動画にコメントしました。講師の励みになりますので、今後もお願いいたします。",
      });
    },
    onError: async (_error, variables) => {
      set({
        type: "error",
        title:
          typeof variables.dto?.rating === "number"
            ? "評価の送信に失敗しました"
            : "コメントの送信に失敗しまいした",
      });
    },
    mutationFn: sendRatingToAnswer,
    ...options,
  });
};
