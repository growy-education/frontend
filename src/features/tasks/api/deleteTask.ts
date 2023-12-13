import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { Task } from "../types/task.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type DeleteTaskVariables = {
  id: string;
};

export const deleteTask = async ({
  id,
}: DeleteTaskVariables): Promise<Task> => {
  return axios.delete(`tasks/${id}`);
};

type UseDeleteTaskOptions = {
  options?: MutationOptions<typeof deleteTask>;
};

export const useDeleteTask = ({ options }: UseDeleteTaskOptions = {}) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (task) => {
      if (location.pathname.includes("tasks/")) {
        navigate(`/tasks`, { replace: true });
      }
      set({
        type: "success",
        title: "タスクを削除しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "タスクを削除できませんでした",
      });
    },
    mutationFn: deleteTask,
    ...options,
  });
};
