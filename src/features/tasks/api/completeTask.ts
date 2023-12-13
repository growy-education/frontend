import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Task } from "../types/task.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { TaskStatus } from "../types/task-status.enum";

type CompleteTaskVariables = {
  id: string;
};

export const completeTask = async ({
  id,
}: CompleteTaskVariables): Promise<Task> => {
  return axios
    .post(`tasks/${id}/review`, {
      status: TaskStatus.COMPLETED,
    })
    .then((response) => {
      return plainToInstance(Task, response.data);
    });
};

type UseCompleteTaskOptions = {
  options?: MutationOptions<typeof completeTask>;
};

export const useCompleteTask = ({ options }: UseCompleteTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (task) => {
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "タスクを完了できませんでした",
      });
    },
    mutationFn: completeTask,
    ...options,
  });
};
