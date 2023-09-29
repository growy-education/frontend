import { useContext } from "react";
import { Button } from "@mui/material";

import { AdminQuestionInfo } from "../questions/AdminQuestionInfo";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { AlertSnackbarContext } from "../../contexts/AlertSnackbarContext";
import axios from "axios";

export const AdminInfo = () => {
  const { handleAxiosError } = useContext(AlertSnackbarContext);
  const { axiosConfig } = useContext(AxiosContext);

  const handleQuestionUpdate = () => {
    axios
      .create(axiosConfig)
      .post("/questions/update")
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  return (
    <>
      <AdminQuestionInfo />
      <Button onClick={handleQuestionUpdate}>質問のアップデート</Button>
    </>
  );
};
