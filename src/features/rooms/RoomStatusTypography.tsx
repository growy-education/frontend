import { Typography, TypographyProps } from "@mui/material";
import { RoomStatus, getRoomStatusText } from "./types/room-status.enum";

type RoomStatusTypographyProps = TypographyProps & {
  status: RoomStatus;
};

export const RoomStatusTypography = ({ status }: RoomStatusTypographyProps) => {
  return <Typography>{getRoomStatusText(status)}</Typography>;
};
