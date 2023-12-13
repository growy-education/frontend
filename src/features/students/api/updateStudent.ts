import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Student } from "../types/student.class";
import { UpdateStudentDto } from "../types/update-student.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type UpdateStudentVariables = {
  id: string;
  dto: UpdateStudentDto;
};

export const updateStudent = async ({
  id,
  dto,
}: UpdateStudentVariables): Promise<Student> => {
  return axios.put(`students/${id}`, dto).then((response) => {
    return plainToInstance(Student, response.data);
  });
};

type UseUpdateStudentOptions = {
  options?: MutationOptions<typeof updateStudent>;
};

export const useUpdateStudent = ({ options }: UseUpdateStudentOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (student) => {
      navigate(`/students/${student.id}`, { replace: true });
      set({
        type: "success",
        title: "保護者情報を更新しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "保護者情報の更新に失敗しました",
      });
    },
    mutationFn: updateStudent,
    ...options,
  });
};
