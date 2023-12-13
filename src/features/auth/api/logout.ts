import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { storage } from "../../../tools/storage";

export const logout = async () => {
  storage.clearAllTokens();
};

type UseLogoutOptions = {
  options?: MutationOptions<typeof logout>;
};

export const useLogout = ({ options }: UseLogoutOptions = {}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/home");
    },
    onError: async () => {
      set({
        type: "error",
        title: "ログアウトできませんでした",
      });
    },
    mutationFn: logout,
    ...options,
  });
};
