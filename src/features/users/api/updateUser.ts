import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { User } from "../types/user.class";
import { UpdateUserDto } from "../types/update-user.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type UpdateUserVariables = {
  id: string;
  dto: UpdateUserDto;
};

export const updateUser = async ({
  id,
  dto,
}: UpdateUserVariables): Promise<User> => {
  return axios.put(`users/${id}`, dto).then((response) => {
    return plainToInstance(User, response.data);
  });
};

type UseUpdateUserOptions = {
  options?: MutationOptions<typeof updateUser>;
};

export const useUpdateUser = ({ options }: UseUpdateUserOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (user) => {
      navigate(`/users/${user.id}`, { replace: true });
      set({
        type: "success",
        title: "ユーザーを更新しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "ユーザーの更新に失敗しました",
      });
    },
    mutationFn: updateUser,
    ...options,
  });
};
