import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type DeleteRoomVariables = {
  roomId: string;
};

export const deleteRoom = async ({
  roomId,
}: DeleteRoomVariables): Promise<void> => {
  return axios.delete(`rooms/${roomId}`);
};

type UseDeleteRoomOptions = {
  options?: MutationOptions<typeof deleteRoom>;
};

export const useDeleteRoom = ({ options }: UseDeleteRoomOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      set({
        type: "success",
        title: "オンライン自習室を削除しました",
      });
      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "削除に失敗しました",
      });
    },
    mutationFn: deleteRoom,
    ...options,
  });
};
