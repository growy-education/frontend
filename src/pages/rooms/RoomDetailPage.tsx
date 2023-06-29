import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Room } from "../../types/room.class";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Typography,
} from "@mui/material";
import { Title } from "../../components/QuestionTitle";
import {
  Add,
  AddCircle,
  Cancel,
  EventAvailable,
  OpenInNew,
} from "@mui/icons-material";
import { mockRooms } from "./RoomListPage";
import { LoadingData } from "../../components/LoadingData";

export const RoomDetail = () => {
  const [room, setRoom] = useState<null | Room>();
  const { axiosConfig } = useAxiosConfig();
  const navigate = useNavigate();

  const { roomId } = useParams();
  useEffect(() => {
    // axios
    //   .create(axiosConfig)
    //   .get(`/rooms/${roomId}`)
    //   .then((response) => {
    //     const room = plainToInstance(Room, response.data);
    //     setRoom(room);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    const rooms = mockRooms.filter((value) => value.id === roomId);
    setRoom(rooms[0]);
  }, [axiosConfig, roomId]);

  if (!room) {
    return <LoadingData message="オンライン自習室の情報を取得中です" />;
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent={"flex-end"} mb={2}>
        {room.reserved ? (
          <Button variant="outlined" endIcon={<Cancel />}>
            この予約をキャンセルする
          </Button>
        ) : (
          <Button
            variant="outlined"
            endIcon={<EventAvailable />}
            onClick={() => navigate("edit")}
          >
            予約を行う
          </Button>
        )}
      </Box>
      <Box my={3}>
        <Title title="ID" />
        <Typography>{room.id}</Typography>
        <Title title="開始日時" />
        <Typography>{room.startAt.toDateString()}</Typography>
        <Title title="更新日時" />
        <Typography>{room.endAt.toDateString()}</Typography>
        <Title title="GoogleMeet URL" />
        <Typography>
          <Button
            endIcon={<OpenInNew />}
            onClick={() => window.open(room.url, "_blank")}
          >
            自習室に参加する
          </Button>
        </Typography>
        <Title title="ステータス" />
        <Typography>{room.status}</Typography>
      </Box>
    </Container>
  );
};
