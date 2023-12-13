import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { AxiosResponse } from "axios";
import { storage } from "../../../tools/storage";

type DebugUserVariables = {
  userId: string;
};

export const debugUser = async ({
  userId,
}: DebugUserVariables): Promise<{ accessToken: string }> => {
  return axios
    .get(`/auth/${userId}`)
    .then((response: AxiosResponse<{ accessToken: string }>) => {
      return response.data;
    });
};

type UseDebugUserOptions = {
  options?: MutationOptions<typeof debugUser>;
};

export const useDebugUser = ({ options }: UseDebugUserOptions = {}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async ({ accessToken }) => {
      storage.setToken(accessToken);
      navigate("/home");
      set({
        type: "success",
        title: "別ユーザーとしてログインしました",
      });
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "別ユーザーとしてログインできませんでした",
      });
    },
    mutationFn: debugUser,
    ...options,
  });
};
