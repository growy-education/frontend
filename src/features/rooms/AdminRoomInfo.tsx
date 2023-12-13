import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import { Room } from "./types/room.class";

export const AdminRoomInfo = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  return (
    <>
      <Typography>オンライン自習室</Typography>
      <Typography>最新のオンライン自習室の予約は"ここに日付"です</Typography>
    </>
  );
};
