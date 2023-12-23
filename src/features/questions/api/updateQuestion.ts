import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Question } from "../types/question.class";
import { UpdateQuestionDto } from "../types/update-question.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type UpdateQuestionVariables = {
  id: string;
  dto: UpdateQuestionDto;
};

export const updateQuestion = async ({
  id,
  dto,
}: UpdateQuestionVariables): Promise<Question> => {
  return axios.patch(`questions/${id}`, dto).then((response) => {
    return plainToInstance(Question, response.data);
  });
};

type UseUpdateQuestionOptions = {
  options?: MutationOptions<typeof updateQuestion>;
};

export const useUpdateQuestion = ({
  options,
}: UseUpdateQuestionOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (question) => {
      navigate(`/questions/${question.id}`, { replace: true });
      set({
        type: "success",
        title: "質問情報を更新しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "質問情報の更新に失敗しました",
      });
    },
    mutationFn: updateQuestion,
    ...options,
  });
};
