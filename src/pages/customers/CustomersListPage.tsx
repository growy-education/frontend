import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Fuse from "fuse.js";

import { useCustomers } from "../../features/customers/api/getCustomers";
import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { SearchTextField } from "../../components/Element/TextField/SearchTextField";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "createdAt", headerName: "作成日時", flex: 1 },
  { field: "updatedAt", headerName: "更新日時", flex: 1 },
  { field: "firstName", headerName: "名前", flex: 1 },
  { field: "firstNameKana", headerName: "名前（フリガナ）" },
  { field: "lastName", headerName: "苗字", flex: 1 },
  { field: "lastNameKana", headerName: "苗字（フリガナ）", flex: 1 },
  { field: "relationship", headerName: "続柄", flex: 1 },
];

export const CustomersListPage = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data: customers } = useCustomers();

  const [searchText, setSearchText] = useState<string>("");

  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  if (isLoading) {
    return <LoadingBox message="保護者情報を取得中" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="ネットワークエラーが発生しました"
        description="保護者情報の取得に失敗しました"
      />
    );
  }

  const fuse = new Fuse(customers, {
    keys: ["id", "firstName", "firstNameKana", "lastName", "lastNameKana"],
  });
  const results = fuse.search(searchText);

  return (
    <Box sx={{ width: "100%" }}>
      <Box mt={2}>
        <SearchTextField
          fullWidth
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </Box>

      <Box mt={2}>
        <DataGrid
          onRowClick={handleRowClick}
          autoHeight
          hideFooter
          columns={columns}
          rows={
            searchText === "" ? customers : results.map((fuse) => fuse.item)
          }
        />
      </Box>
    </Box>
  );
};
