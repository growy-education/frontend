import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { User } from "../types/user.class";
import { CreateUserDto } from "../types/create-user.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

export const createUser = async (data: CreateUserDto): Promise<User> => {
  return axios.post("users", data).then((response) => {
    return plainToInstance(User, response.data);
  });
};

type UseCreateUserOptions = {
  options?: MutationOptions<typeof createUser>;
};

export const useCreateUser = ({ options }: UseCreateUserOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (user) => {
      navigate(`/users/${user.id}`);
      set({
        type: "success",
        title: "ユーザーを作成しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: async (error) => {
      console.error(error);
      set({
        type: "error",
        title: "ユーザーの作成に失敗しました",
      });
    },
    mutationFn: createUser,
    ...options,
  });
};
