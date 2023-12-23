import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Room } from "../types/room.class";
import { UpdateRoomDto } from "../types/update-room.dto";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";

type UpdateRoomVariables = {
  id: string;
  dto: UpdateRoomDto;
};

export const updateRoom = async ({
  id,
  dto,
}: UpdateRoomVariables): Promise<Room> => {
  return axios.patch(`rooms/${id}`, dto).then((response) => {
    return plainToInstance(Room, response.data);
  });
};

type UseUpdateRoomOptions = {
  options?: MutationOptions<typeof updateRoom>;
};

export const useUpdateRoom = ({ options }: UseUpdateRoomOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (room) => {
      set({
        type: "success",
        title: "情報を更新しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "情報の更新に失敗しました",
      });
    },
    mutationFn: updateRoom,
    ...options,
  });
};
