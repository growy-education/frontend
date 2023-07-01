import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxiosConfig } from "../contexts/AxiosContextProvider";
import { Question } from "../types/question.class";
import axios from "axios";

export const AdminQuestionInfo = () => {
  const navigate = useNavigate();
  const { axiosConfig } = useAxiosConfig();

  const [questions, setQusions] = useState<Question[]>([]);

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("questions")
      .then((response) => {})
      .catch(() => {});
  }, [axiosConfig]);

  return (
    <>
      <Typography>質問回答</Typography>
      <Typography>質問が割り当てられていません</Typography>
      <Typography>解説動画のチェックが必要です</Typography>
    </>
  );
};
