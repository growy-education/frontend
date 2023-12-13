import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

export const reportQuestion = async (id: string): Promise<void> => {
  return axios.delete(`/images/${id}`);
};

type UseDeleteImageOptions = {
  options?: MutationOptions<typeof reportQuestion>;
};

export const useDeleteImage = ({ options }: UseDeleteImageOptions = {}) => {
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      set({
        type: "success",
        title: "画像を削除しました",
      });
    },
    onError: async (error) => {
      console.log(error);
      set({
        type: "error",
        title: "画像の削除に失敗しました",
      });
    },
    mutationFn: reportQuestion,
    ...options,
  });
};
