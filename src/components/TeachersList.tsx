import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { AxiosContext } from "../contexts/AxiosContextProvider";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Teacher } from "../types/teacher.class";

export const TeachersList = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const { axiosConfig } = useContext(AxiosContext);

  const navigate = useNavigate();
  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("teachers")
      .then((response) => {
        console.log(response.data);
        const teachers = response.data.map((teacherJson: string) =>
          plainToInstance(Teacher, teacherJson)
        );
        setTeachers(teachers);
      })
      .catch((error) =>
        console.log("error occurred at TeachersList.tsx", error)
      );
  }, [axiosConfig]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "createdAt", headerName: "作成日時", flex: 1 },
    { field: "updatedAt", headerName: "更新日時", flex: 1 },
    { field: "firstName", headerName: "お名前", flex: 1 },
    { field: "firstNameKana", headerName: "お名前（読み仮名）", flex: 1 },
    { field: "lastName", headerName: "苗字", flex: 1 },
    { field: "lastNameKana", headerName: "苗字（読み仮名）", flex: 1 },
    { field: "status", headerName: "ステータス", flex: 1 },
    { field: "assignedQuestionsNumber", headerName: "質問数", flex: 1 },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        onRowClick={handleRowClick}
        autoHeight
        hideFooter
        rows={teachers}
        columns={columns}
      />
    </Box>
  );
};
