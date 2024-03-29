import { Button, Typography } from "@mui/material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { Room } from "./types/room.class";
import { JaDateTimeTypography } from "../../components/Element/Typography/JaDateTimeTypography";
import { OpenInNew } from "@mui/icons-material";
import { RoomStatusTypography } from "./RoomStatus";

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
      <HeadlineTypography>自習室ID</HeadlineTypography>
      <Typography>{id}</Typography>
      <HeadlineTypography>開始日時</HeadlineTypography>
      <JaDateTimeTypography date={startAt} />
      <HeadlineTypography>終了日時</HeadlineTypography>
      <JaDateTimeTypography date={endAt} />
      <HeadlineTypography>GoogleMeet URL</HeadlineTypography>
      <Typography>
        <Button
          endIcon={<OpenInNew />}
          onClick={() => window.open(url, "_blank")}
        >
          自習室に参加する
        </Button>
      </Typography>
      <HeadlineTypography>ステータス</HeadlineTypography>
      <RoomStatusTypography status={status} />
    </>
  );
};
