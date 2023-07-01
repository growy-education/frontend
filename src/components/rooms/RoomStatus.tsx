import { Typography, TypographyProps } from "@mui/material";
import { RoomStatus } from "../../types/room-status.enum";

type RoomStatusTypographyProps = TypographyProps & {
  status: RoomStatus;
};

const statusDescription = (status: RoomStatus) => {
  if (status === RoomStatus.CANCELLED) {
    return "開催中止";
  }
  if (status === RoomStatus.COMPLETED) {
    return "開催済み";
  }
  if (status === RoomStatus.SCHEDULED) {
    return "開催予定";
  }
  throw new Error(`not implemented error at: ${__dirname}`);
};

export const RoomStatusTypography = ({ status }) => {
  return <Typography>{statusDescription(status)}</Typography>;
};
