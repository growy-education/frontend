import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { QueryOptions } from "../../../tools/react-query";
import { axios } from "../../../tools/axios";
import { Room } from "../types/room.class";

type GetRoomVariables = {
  roomId: string;
};

export const getRoom = async ({ roomId }: GetRoomVariables): Promise<Room> => {
  return axios.get(`/rooms/${roomId}`).then((response) => {
    return plainToInstance(Room, response.data);
  });
};

type UseRoomOptions = {
  roomId: string;
  options?: QueryOptions<typeof getRoom>;
};

export const useRoom = ({ roomId, options }: UseRoomOptions) => {
  return useQuery({
    queryKey: ["rooms", roomId],
    queryFn: () => getRoom({ roomId }),
    ...options,
  });
};
