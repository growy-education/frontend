import { useEffect, useState } from "react";
import { useAxiosConfig } from "../contexts/AxiosContextProvider";
import { Room } from "../types/room.class";
import { Typography } from "@mui/material";

export const AdminRoomInfo = () => {
  const { axiosConfig } = useAxiosConfig();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {}, [axiosConfig]);

  return (
    <>
      <Typography>オンライン自習室</Typography>
      <Typography>最新のオンライン自習室の予約は"ここに日付"です</Typography>
    </>
  );
};
