import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Student } from "../../types/student.class";

export const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const { axiosConfig } = useContext(AxiosContext);

  const navigate = useNavigate();
  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("students")
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("ネットワークエラー");
        }
        const students = response.data.map((studentJson: string) =>
          plainToInstance(Student, studentJson)
        );
        setStudents(students);
      })
      .catch((error) =>
        console.log("error occurred at StudentsList.tsx", error)
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
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        onRowClick={handleRowClick}
        autoHeight
        hideFooter
        rows={students}
        columns={columns}
      />
    </Box>
  );
};
