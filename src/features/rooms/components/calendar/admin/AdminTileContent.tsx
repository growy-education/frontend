import { Box, Tooltip, Typography } from "@mui/material";
import { Room } from "../../../types/room.class";
import dayjs from "dayjs";

type AdminTileContentProps = {
  rooms: Room[];
  date: Date;
  view: string;
};

export const AdminTileContent = ({
  rooms,
  view,
  date,
}: AdminTileContentProps) => {
  if (view === "month") {
    const room = rooms.find(
      (room) =>
        date.getTime() < room.startAt.getTime() &&
        room.startAt.getTime() < date.getTime() + 24 * 60 * 60 * 1000
    );

    return (
      <Tooltip
        title={!!room ? "詳細を確認する" : "自習室を作成する"}
        placement="top"
      >
        <Box
          minHeight="60px"
          width="100%"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          <Typography fontWeight={"bold"}>{date.getDate()}</Typography>
          {!!room && (
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
