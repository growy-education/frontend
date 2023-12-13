import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Task } from "../types/task.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { TaskStatus } from "../types/task-status.enum";
import { RetryQuestionTaskDto } from "../../questions/types/retry-question-task.dto";

type RetryTaskVariables = {
  id: string;
  dto: RetryQuestionTaskDto;
};

export const retryTask = async ({
  id,
  dto,
}: RetryTaskVariables): Promise<Task> => {
  return axios
    .post(`tasks/${id}/review`, {
      status: TaskStatus.IN_PROGRESS,
      retryMessage: dto.retryMessage,
    })
    .then((response) => {
      return plainToInstance(Task, response.data);
    });
};

type UseRetryTaskOptions = {
  options?: MutationOptions<typeof retryTask>;
};

export const useRetryTask = ({ options }: UseRetryTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (task) => {
      set({
        type: "success",
        title: "タスクの不備を指摘しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks", task.id] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "タスクの更新に失敗しました",
      });
    },
    mutationFn: retryTask,
    ...options,
  });
};
