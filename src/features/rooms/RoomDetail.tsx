import { Divider, Typography } from "@mui/material";
import { Room } from "./types/room.class";
import { RoomUrl } from "./RoomUrl";
import { RoomStartAt } from "./components/startAt/RoomStartAt";
import { RoomEndAt } from "./components/endAt/RoomEndAt";
import { RoomStudents } from "./components/students/RoomStudents";
import { RoomStatus } from "./components/RoomStatus";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { RolesGuard } from "../../tools/RolesGuard";
import { RoomTeacher } from "./components/teacher/RoomTeacher";

type RoomDetailProps = {
  room: Room;
};

export const RoomDetail = ({ room }: RoomDetailProps) => {
  const { id } = room;
  return (
    <>
      <HeadlineTypography>自習室ID</HeadlineTypography>
      <Typography>{id}</Typography>
      <Divider />
      <RoomStartAt room={room} />
      <Divider />
      <RoomEndAt room={room} />
      <Divider />
      <RoomUrl room={room} />
      <Divider />
      <RoomStatus room={room} />
      <Divider />
      <RoomStudents room={room} />
      <Divider />
      <RoomTeacher room={room} />
    </>
  );
};
