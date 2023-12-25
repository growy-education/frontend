import { useContext } from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import dayjs from "dayjs";
import { AuthContext } from "../../../../../providers/auth.provider";
import { Room } from "../../../types/room.class";

type CustomerCalendarTileContentProps = {
  rooms: Room[];
  date: Date;
  view: string;
};

export const CustomerCalendarTileContent = ({
  rooms,
  date,
  view,
}: CustomerCalendarTileContentProps) => {
  const { user } = useContext(AuthContext);

  if (view === "month") {
    const room = rooms.find(
      (room) =>
        date.getTime() < room.startAt.getTime() &&
        room.startAt.getTime() < date.getTime() + 24 * 60 * 60 * 1000
    );

    const reserved = room?.students?.some(
      (student) => user?.student?.id === student?.id
    );

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
          {reserved && (
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
