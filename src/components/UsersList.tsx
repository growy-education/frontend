import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { AxiosContext } from "../AxiosContextProvider";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { User } from "../types/user.class";

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { axiosConfig } = useContext(AxiosContext);

  const navigate = useNavigate();
  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("users")
      .then((response) => {
        console.log(response.data);
        const users = response.data.map((userJson: string) =>
          plainToInstance(User, userJson)
        );
        setUsers(users);
      })
      .catch((error) => console.log("error occurred at UsersList.tsx", error));
  }, [axiosConfig]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "createdAt", headerName: "作成日時", flex: 1 },
    { field: "updatedAt", headerName: "更新日時", flex: 1 },
    { field: "username", headerName: "ユーザー名", flex: 1 },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        onRowClick={handleRowClick}
        autoHeight
        hideFooter
        rows={users}
        columns={columns}
      />
    </Box>
  );
};
