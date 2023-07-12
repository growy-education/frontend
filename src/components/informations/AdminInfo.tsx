import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import axios from "axios";
import { AdminQuestionInfo } from "../questions/AdminQuestionInfo";
import { AdminRoomInfo } from "../rooms/AdminRoomInfo";

export const AdminInfo = () => {
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
        <AdminQuestionInfo />
      </Box>
      <Box>
        <AdminRoomInfo />
      </Box>
    </>
  );
};
