import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Question } from "../types/question.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { CreateQuestionForTeacherDto } from "../types/create-question-for-teacher";

export const createQuestionForTeacher = async (
  data: CreateQuestionForTeacherDto
): Promise<Question> => {
  return axios.post("/questions/training", data).then((response) => {
    return plainToInstance(Question, response.data);
  });
};

type UseCreateQuestionOptions = {
  options?: MutationOptions<typeof createQuestionForTeacher>;
};

export const useCreateQuestionForTeacher = ({
  options,
}: UseCreateQuestionOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (question) => {
      navigate(`/questions/${question.id}`);
      set({
        type: "success",
        title: "質問を作成しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "質問の作成に失敗しました",
      });
    },
    mutationFn: createQuestionForTeacher,
    ...options,
  });
};
