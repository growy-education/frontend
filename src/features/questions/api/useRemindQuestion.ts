import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type RemindQuestionVariables = {
  questionId: string;
};

export const remindQuestion = async ({
  questionId,
}: RemindQuestionVariables): Promise<void> => {
  return axios.post(`questions/${questionId}/reminder`);
};

type UseCancelQuestionOptions = {
  options?: MutationOptions<typeof remindQuestion>;
};

export const useRemindQuestion = ({
  options,
}: UseCancelQuestionOptions = {}) => {
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      set({
        type: "success",
        title: "講師へリマインドしました",
      });
    },
    onError: async () => {
      set({
        type: "error",
        title: "講師へのリマインドに失敗しました",
      });
    },
    mutationFn: remindQuestion,
    ...options,
  });
};
