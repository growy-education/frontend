import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Teacher } from "../types/teacher.class";
import { CreateTeacherDto } from "../types/create-teacher.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

export const createTeacher = async (
  data: CreateTeacherDto
): Promise<Teacher> => {
  return axios.post("teachers", data).then((response) => {
    return plainToInstance(Teacher, response.data);
  });
};

type UseCreateTeacherOptions = {
  options?: MutationOptions<typeof createTeacher>;
};

export const useCreateTeacher = ({ options }: UseCreateTeacherOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (_data, dto) => {
      navigate(`/users/${dto.userId}`);
      set({
        type: "success",
        title: "講師情報を追加しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["users", dto.userId] });
      await queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "講師情報の追加に失敗しました",
      });
    },
    mutationFn: createTeacher,
    ...options,
  });
};
