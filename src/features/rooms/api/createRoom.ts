import { useMutation, useQueryClient } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";

import { axios } from "../../../tools/axios";
import { Room } from "../types/room.class";
import { useToastStore } from "../../../stores/toast.store";
import { MutationOptions } from "../../../tools/react-query";
import { CreateRoomDto } from "../types/create-room.dto";

export const createRoom = async (data: CreateRoomDto): Promise<Room> => {
  return axios.post("rooms", data).then((response) => {
    return plainToInstance(Room, response.data);
  });
};

type UseCreateRoomOptions = {
  options?: MutationOptions<typeof createRoom>;
};

export const useCreateRoom = ({ options }: UseCreateRoomOptions = {}) => {
  const queryClient = useQueryClient();
  const { set } = useToastStore();

  return useMutation({
    onSuccess: async (room) => {
      set({
        type: "success",
        title: "オンライン自習室を作成しました",
      });
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: async (error) => {
      set({
        type: "error",
        title: "作成に失敗しました",
      });
    },
    mutationFn: createRoom,
    ...options,
  });
};
