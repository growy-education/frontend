import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { AxiosContext } from "../AxiosContextProvider";
import { CircleOutlined, Close, Link } from "@mui/icons-material";
import axios from "axios";
import { TablePagination } from "@mui/material";

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
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
        console.log(response.data);
        setQuestions(response.data);
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
