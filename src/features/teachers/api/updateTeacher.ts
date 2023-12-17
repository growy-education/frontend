import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Teacher } from "../types/teacher.class";
import { UpdateTeacherDto } from "../types/update-teacher.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type UpdateTeacherVariables = {
  id: string;
  dto: UpdateTeacherDto;
};

export const updateTeacher = async ({
  id,
  dto,
}: UpdateTeacherVariables): Promise<Teacher> => {
  return axios.patch(`teachers/${id}`, dto).then((response) => {
    return plainToInstance(Teacher, response.data);
  });
};

type UseUpdateTeacherOptions = {
  options?: MutationOptions<typeof updateTeacher>;
};

export const useUpdateTeacher = ({ options }: UseUpdateTeacherOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (teacher, variables) => {
      set({
        type: "success",
        title: "講師情報を更新しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["teachers"] });
      if (variables.id === "me") {
        await queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      }
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "講師情報の更新に失敗しました",
      });
    },
    mutationFn: updateTeacher,
    ...options,
  });
};
