import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { User } from "../types/user.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { ActivateUserDto } from "../types/activate-user.dto";

type ActivateUserVariables = {
  userId: string;
  dto: ActivateUserDto;
};

export const activateUser = async ({
  userId,
  dto,
}: ActivateUserVariables): Promise<User> => {
  return axios
    .put(`/users/${userId}/activation`, dto)
    .then((response) => plainToInstance(User, response.data));
};

type UseActivateUserOptions = {
  options?: MutationOptions<typeof activateUser>;
};

export const useActivateUser = ({ options }: UseActivateUserOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (user) => {
      set({
        type: "success",
        title: "アカウントを有効にしました",
      });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "アカウントを有効にできませんでした",
      });
    },
    mutationFn: activateUser,
    ...options,
  });
};
