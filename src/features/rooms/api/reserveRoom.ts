import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type ReserveRoomVariables = {
  roomId: string;
};

export const reserveRoom = async ({
  roomId,
}: ReserveRoomVariables): Promise<void> => {
  return axios.post(`rooms/${roomId}/reservation`);
};

type UseReserveRoomOptions = {
  options?: MutationOptions<typeof reserveRoom>;
};

export const useReserveRoom = ({ options }: UseReserveRoomOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      set({
        type: "success",
        title: "予約しました",
      });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "予約に失敗しました",
      });
    },
    mutationFn: reserveRoom,
    ...options,
  });
};
