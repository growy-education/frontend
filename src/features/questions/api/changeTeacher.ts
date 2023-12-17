import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Question } from "../types/question.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type ChangeTeacherVariables = {
  questionId: string;
  teacherId: string;
};

export const changeTeacher = async ({
  questionId,
  teacherId,
}: ChangeTeacherVariables): Promise<Question> => {
  return axios
    .patch(`questions/${questionId}`, { teacher: { id: teacherId } })
    .then((response) => {
      return plainToInstance(Question, response.data);
    });
};

type UseChangeTeacherOptions = {
  options?: MutationOptions<typeof changeTeacher>;
};

export const useChangeTeacher = ({ options }: UseChangeTeacherOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (question) => {
      set({
        type: "success",
        title: "講師を変更しました",
      });
      await queryClient.invalidateQueries({
        queryKey: ["questions", question.id],
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "講師の変更に失敗しました",
      });
    },
    mutationFn: changeTeacher,
    ...options,
  });
};
