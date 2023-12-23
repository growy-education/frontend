import { plainToInstance } from "class-transformer";
import { useQuery } from "@tanstack/react-query";

import { Room } from "../types/room.class";
import { axios } from "../../../tools/axios";
import { QueryOptions } from "../../../tools/react-query";

export const getRooms = async (): Promise<Room[]> => {
  return axios.get(`/rooms`).then((response) => {
    if (!Array.isArray(response.data)) {
      throw new Error(`Server response is not valid`);
    }
    return plainToInstance(Room, response.data);
  });
};

type UseRoomsOptions = {
  options?: QueryOptions<typeof getRooms>;
};

export const useRooms = ({ options }: UseRoomsOptions = {}) => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
    initialData: [],
    ...options,
  });
};
