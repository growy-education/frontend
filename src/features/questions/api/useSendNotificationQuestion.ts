import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type sendNotificationQuestionVariables = {
  questionId: string;
};

export const sendNotificationQuestion = async ({
  questionId,
}: sendNotificationQuestionVariables): Promise<void> => {
  return axios.post(`questions/${questionId}/listener`);
};

type UseSendNotificationQuestionOptions = {
  options?: MutationOptions<typeof sendNotificationQuestion>;
};

export const useSendNotificationQuestion = ({
  options,
}: UseSendNotificationQuestionOptions = {}) => {
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      set({
        type: "success",
        title: "生徒へアナウンスしました",
      });
    },
    onError: async () => {
      set({
        type: "error",
        title: "生徒へのアナウンスに失敗しました",
      });
    },
    mutationFn: sendNotificationQuestion,
    ...options,
  });
};
