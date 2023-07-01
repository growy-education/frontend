import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { Room } from "../../types/room.class";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Box, Button, Container } from "@mui/material";
import { Cancel, EventAvailable } from "@mui/icons-material";
import { LoadingData } from "../../components/LoadingData";
import { UserContext } from "../../contexts/UserContextProvider";

export const RoomDetail = () => {
  const { axiosConfig } = useAxiosConfig();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [room, setRoom] = useState<null | Room>();
  const { roomId } = useParams();

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get(`/rooms/${roomId}`)
      .then((response) => {
        const room = plainToInstance(Room, response.data);
        setRoom(room);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, roomId]);

  if (!room) {
    return <LoadingData message="オンライン自習室の情報を取得中です" />;
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
