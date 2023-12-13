import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Room } from "../../features/rooms/types/room.class";
import { plainToInstance } from "class-transformer";
import { Box, Button, Container } from "@mui/material";
import { Cancel, EventAvailable } from "@mui/icons-material";
import { LoadingBox } from "../../features/LoadingData";
import { axios } from "../../tools/axios";
import { AuthContext } from "../../providers/auth.provider";

export const RoomDetail = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState<null | Room>();
  const { roomId } = useParams();

  useEffect(() => {
    axios
      .get(`/rooms/${roomId}`)
      .then((response) => {
        const room = plainToInstance(Room, response.data);
        setRoom(room);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [roomId]);

  if (!room) {
    return <LoadingBox message="オンライン自習室の情報を取得中です" />;
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent={"flex-end"} mb={2}>
        {room.students.some((student) => student.user.id === user.id) ? (
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
      <Box my={3}></Box>
    </Container>
  );
};
