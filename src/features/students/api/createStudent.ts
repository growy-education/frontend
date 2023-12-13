import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Student } from "../types/student.class";
import { CreateStudentDto } from "../types/create-student.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

export const createStudent = async (
  data: CreateStudentDto
): Promise<Student> => {
  return axios.post("students", data).then((response) => {
    return plainToInstance(Student, response.data);
  });
};

type UseCreateStudentOptions = {
  options?: MutationOptions<typeof createStudent>;
};

export const useCreateStudent = ({ options }: UseCreateStudentOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (_data, dto) => {
      navigate(`/users/${dto.userId}`);
      set({
        type: "success",
        title: "保護者情報を追加しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["users", dto.userId] });
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "保護者情報の追加に失敗しました",
      });
    },
    mutationFn: createStudent,
    ...options,
  });
};
