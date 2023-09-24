import { useContext } from "react";
import { Button } from "@mui/material";

import { AdminQuestionInfo } from "../questions/AdminQuestionInfo";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { AlertSnackbarContext } from "../../contexts/AlertSnackbarContext";
import axios from "axios";

export const AdminInfo = () => {
  const { handleAxiosError } = useContext(AlertSnackbarContext);
  const { axiosConfig } = useContext(AxiosContext);
  const handleCustomerRegister = () => {
    axios
      .create(axiosConfig)
      .post("/customers/register")
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const handleStudentRegister = () => {
    axios
      .create(axiosConfig)
      .post("/students/register")
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const handleTeacherRegister = () => {
    axios
      .create(axiosConfig)
      .post("/teachers/register")
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

  const handleQuestionRegister = () => {
    axios
      .create(axiosConfig)
      .post("/questions/register")
      .catch((error) => {
        handleAxiosError(error);
        return error;
      });
  };

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
      {/* <AdminRoomInfo /> */}
      <Button onClick={handleCustomerRegister}>保護者の登録</Button>
      <Button onClick={handleStudentRegister}>生徒の登録</Button>
      <Button onClick={handleTeacherRegister}>講師の登録</Button>
      <Button onClick={handleQuestionRegister}>質問の登録</Button>
      <Button onClick={handleQuestionUpdate}>質問のアップデート</Button>
    </>
  );
};
