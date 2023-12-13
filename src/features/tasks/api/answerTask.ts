import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { AnswerQuestionTaskDto } from "../../questions/types/answer-question-task.dto";
import { getYoutubeUrl } from "../../../tools/get-youtube-url";
import { plainToInstance } from "class-transformer";
import { Task } from "../types/task.class";

type AnswerTaskVariables = {
  questionId: string;
  taskId: string;
  dto: AnswerQuestionTaskDto;
};

export const answerQuestionTask = async ({
  questionId,
  taskId,
  dto,
}: AnswerTaskVariables): Promise<Task> => {
  return axios
    .post(`tasks/${taskId}/answer`, {
      answer: getYoutubeUrl(dto.answer),
    })
    .then((response) => {
      return plainToInstance(Task, response.data);
    });
};

type UseAnswerQuestionTaskOptions = {
  options?: MutationOptions<typeof answerQuestionTask>;
};

export const useAnswerQuestionTask = ({
  options,
}: UseAnswerQuestionTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (task, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["questions", variables.questionId],
      });
      set({
        type: "success",
        title: "タスクに回答しました",
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "タスクの回答に失敗しました",
      });
    },
    mutationFn: answerQuestionTask,
    ...options,
  });
};
