import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Lesson } from "../types/lesson.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type ConfirmLessonVariables = {
  lessonId: string;
};

export const confirmLesson = async ({
  lessonId,
}: ConfirmLessonVariables): Promise<Lesson> => {
  return axios.post(`/lessons/${lessonId}/confirm`).then((response) => {
    return plainToInstance(Lesson, response.data);
  });
};

type UseConfirmLessonOptions = {
  options?: MutationOptions<typeof confirmLesson>;
};

export const useConfirmLesson = ({ options }: UseConfirmLessonOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (lesson) => {
      set({
        type: "success",
        title: "授業を確認しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "授業を確認できませんでした",
      });
    },
    mutationFn: confirmLesson,
    ...options,
  });
};
