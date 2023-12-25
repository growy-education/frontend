import { useContext } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { AuthContext } from "../../../../../providers/auth.provider";
import { Room } from "../../../types/room.class";

type TeacherCalendarTileContentProps = {
  rooms: Room[];
  date: Date;
  view: string;
};

export const TeacherCalendarTileContent = ({
  rooms,
  date,
  view,
}: TeacherCalendarTileContentProps) => {
  const { user } = useContext(AuthContext);

  if (view === "month") {
    const room = rooms.find(
      (room) =>
        date.getTime() < room.startAt.getTime() &&
        room.startAt.getTime() < date.getTime() + 24 * 60 * 60 * 1000
    );

    const isInCharge = user?.teacher?.id === room?.teacher?.id;

    return (
      <Tooltip
        title={!!room ? "詳細を確認する" : "自習室が開催されません"}
        placement="top"
      >
        <Box
          width="100%"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          <Typography fontWeight={"bold"}>{date.getDate()}</Typography>
          {isInCharge && (
            <Box textAlign="left">
              <Typography variant="caption" fontSize={"0.6rem"}>
                {`${dayjs(room.startAt).format("HH:mm")}`}
              </Typography>
              <br />
              <Typography variant="caption" fontSize="0.6rem">
                オンライン自習室
              </Typography>
            </Box>
          )}
        </Box>
      </Tooltip>
    );
  }
};
