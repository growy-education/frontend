import { useMutation, useQueryClient } from "@tanstack/react-query";

import { axios } from "../../../tools/axios";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

export const cancelReservation = async (id: string): Promise<void> => {
  return axios.delete(`/rooms/${id}/reservation`);
};

type UseCancelReservationOptions = {
  options?: MutationOptions<typeof cancelReservation>;
};

export const useCancelReservation = ({
  options,
}: UseCancelReservationOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async () => {
      set({
        type: "success",
        title: "予約キャンセルしました",
      });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "キャンセルに失敗しました",
      });
    },
    mutationFn: cancelReservation,
    ...options,
  });
};
