import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { AxiosResponse } from "axios";
import { storage } from "../../../tools/storage";
import { GoogleCredentialResponse } from "@react-oauth/google";

type LoginWithGoogleVaiables = {
  response: GoogleCredentialResponse;
};

export const loginWithGoogle = async ({
  response,
}: LoginWithGoogleVaiables): Promise<{ accessToken: string }> => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/google`, {
      token: response.credential,
    })
    .then((response: AxiosResponse<{ accessToken: string }>) => {
      return response.data;
    });
};

type UseLoginWithGoogle = {
  options?: MutationOptions<typeof loginWithGoogle>;
};

export const useLoginWithGoogle = ({ options }: UseLoginWithGoogle = {}) => {
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
        title: "Googleログインに失敗しました",
      });
    },
    mutationFn: loginWithGoogle,
    ...options,
  });
};
