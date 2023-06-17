import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { AxiosContext } from "../AxiosContextProvider";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Customer } from "../types/customer.class";

export const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { axiosConfig } = useContext(AxiosContext);

  const navigate = useNavigate();
  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("customers")
      .then((response) => {
        console.log(response.data);
        const customers = response.data.map((customerJson: string) =>
          plainToInstance(Customer, customerJson)
        );
        setCustomers(customers);
      })
      .catch((error) =>
        console.log("error occurred at CustomersList.tsx", error)
      );
  }, [axiosConfig]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "createdAt", headerName: "作成日時", flex: 1 },
    { field: "updatedAt", headerName: "更新日時", flex: 1 },
    { field: "firstName", headerName: "お名前", flex: 1 },
    { field: "firstNameKana", headerName: "お名前（読み仮名）", flex: 1 },
    { field: "lastName", headerName: "苗字", flex: 1 },
    { field: "lastName", headerName: "苗字（読み仮名）", flex: 1 },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        onRowClick={handleRowClick}
        autoHeight
        hideFooter
        rows={customers}
        columns={columns}
      />
    </Box>
  );
};
