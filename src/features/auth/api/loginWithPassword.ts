import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { AxiosResponse } from "axios";
import { storage } from "../../../tools/storage";

type LoginWithPasswordVaiables = {
  email: string;
  password: string;
};

export const loginWithPassword = async ({
  email,
  password,
}: LoginWithPasswordVaiables): Promise<{ accessToken: string }> => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/password`, {
      email,
      password,
    })
    .then((response: AxiosResponse<{ accessToken: string }>) => {
      return response.data;
    });
};

type UseLoginWithPassword = {
  options?: MutationOptions<typeof loginWithPassword>;
};

export const useLoginWithPassword = ({
  options,
}: UseLoginWithPassword = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async ({ accessToken }) => {
      storage.setToken(accessToken);
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "ログイン情報が間違っています",
      });
    },
    mutationFn: loginWithPassword,
    ...options,
  });
};
