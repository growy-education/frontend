import { useContext } from "react";
import { Button } from "@mui/material";

import { AdminQuestionInfo } from "../questions/AdminQuestionInfo";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { AlertSnackbarContext } from "../../contexts/AlertSnackbarContext";
import axios from "axios";

export const AdminInfo = () => {
  return (
    <>
      <AdminQuestionInfo />
    </>
  );
};
