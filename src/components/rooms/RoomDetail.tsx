import { Button, Typography } from "@mui/material";
import { Title } from "../QuestionTitle";
import { Room } from "../../types/room.class";
import { JaDateTime } from "../JaDateTime";
import { OpenInNew } from "@mui/icons-material";
import { RoomStatusTypography } from "./RoomStatus";
import { StudentAccordion } from "../students/StudentAccordion";

type RoomDetailProps = {
  room: Room;
};

export const RoomDetail = ({ room }: RoomDetailProps) => {
  const {
    id,
    createdAt,
    updatedAt,
    startAt,
    endAt,
    url,
    status,
    students,
    teachers,
  } = room;
  return (
    <>
      <Title title="ID" />
      <Typography>{id}</Typography>
      <Title title="開始日時" />
      <JaDateTime date={startAt} />
      <Title title="終了日時" />
      <JaDateTime date={endAt} />
      <Title title="GoogleMeet URL" />
      <Typography>
        <Button
          endIcon={<OpenInNew />}
          onClick={() => window.open(url, "_blank")}
        >
          自習室に参加する
        </Button>
      </Typography>
      <Title title="ステータス" />
      <RoomStatusTypography status={status} />
    </>
  );
};
