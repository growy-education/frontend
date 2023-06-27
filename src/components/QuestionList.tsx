import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { AxiosContext } from "../contexts/AxiosContextProvider";
import { CircleOutlined, Close } from "@mui/icons-material";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Question } from "../types/question.class";

export const QuestionList = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const { axiosConfig } = useContext(AxiosContext);

  const navigate = useNavigate();
  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("questions")
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("ネットワークエラー");
        }
        const questions = response.data.map((userJson: string) => {
          return plainToInstance(Question, userJson);
        });
        setQuestions(questions);
      })
      .catch((error) =>
        console.log("error occurred at QuestionList.tsx", error)
      );
  }, [axiosConfig]);

  const columns: GridColDef[] = [
    { field: "createdAt", headerName: "日時", flex: 1 },
    { field: "title", headerName: "タイトル", flex: 1 },
    { field: "content", headerName: "内容", flex: 1 },
    {
      field: "available",
      headerName: "視聴可能",
      flex: 1,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        const isAvailable = params.value as boolean;
        return isAvailable ? <CircleOutlined /> : <Close />;
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        onRowClick={handleRowClick}
        autoHeight
        hideFooter
        rows={questions}
        columns={columns}
      />
    </Box>
  );
};
