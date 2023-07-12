import { useNavigate } from "react-router-dom";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import { useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { TeacherRoomInfo } from "../rooms/TeacherRoomInfo";
import { TeacherQuestionInfo } from "../questions/TeacherQuestionInfo";

export const TeacherInfo = () => {
  const navigate = useNavigate();
  const { axiosConfig } = useAxiosConfig();

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("")
      .then((response) => {})
      .catch(() => {});
  }, [axiosConfig]);

  return (
    <>
      <Box>
        <TeacherQuestionInfo />
      </Box>
      <Box>
        <TeacherRoomInfo />
      </Box>
    </>
  );
};
