import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { AddTaskToQuestionDto } from "../types/add-task-to-question.dto";
import { Task } from "../../tasks/types/task.class";

type AddTaskToQuestionVariables = {
  questionId: string;
  dto: AddTaskToQuestionDto;
};

export const addTaskToQuestion = async ({
  questionId,
  dto,
}: AddTaskToQuestionVariables): Promise<Task> => {
  return axios.post(`questions/${questionId}/tasks`, dto).then((response) => {
    return plainToInstance(Task, response.data);
  });
};

type UseAddTaskToQuestionOptions = {
  options?: MutationOptions<typeof addTaskToQuestion>;
};

export const useAddTaskToQuestion = ({
  options,
}: UseAddTaskToQuestionOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (task, variables) => {
      set({
        type: "success",
        title: "タスクを追加しました",
      });
      await queryClient.invalidateQueries({
        queryKey: ["questions", variables.questionId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "タスクの追加に失敗しました",
      });
    },
    mutationFn: addTaskToQuestion,
    ...options,
  });
};
