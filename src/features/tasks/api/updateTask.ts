import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Task } from "../types/task.class";
import { UpdateTaskDto } from "../types/update-task.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type UpdateTaskVariables = {
  id: string;
  dto: UpdateTaskDto;
};

export const updateTask = async ({
  id,
  dto,
}: UpdateTaskVariables): Promise<Task> => {
  return axios.patch(`tasks/${id}`, dto).then((response) => {
    return plainToInstance(Task, response.data);
  });
};

type UseUpdateTaskOptions = {
  options?: MutationOptions<typeof updateTask>;
};

export const useUpdateTask = ({ options }: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (task) => {
      set({
        type: "success",
        title: "タスクを更新しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "タスクの更新に失敗しました",
      });
    },
    mutationFn: updateTask,
    ...options,
  });
};
