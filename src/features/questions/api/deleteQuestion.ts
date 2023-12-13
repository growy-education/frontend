import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type DeleteQuestionVariables = {
  questionId: string;
};

export const deleteQuestion = async ({
  questionId,
}: DeleteQuestionVariables): Promise<void> => {
  return axios.delete(`questions/${questionId}`);
};

type UseDeleteQuestionOptions = {
  options?: MutationOptions<typeof deleteQuestion>;
};

export const useDeleteQuestion = ({
  options,
}: UseDeleteQuestionOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      navigate(`/questions`);
      set({
        type: "success",
        title: "質問を削除しました",
      });
      await queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "質問の削除に失敗しました",
      });
    },
    mutationFn: deleteQuestion,
    ...options,
  });
};
