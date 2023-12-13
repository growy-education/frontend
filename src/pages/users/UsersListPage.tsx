import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";

import { CustomDataGrid } from "../../components/Element/DataGrid/CustomDataGrid";
import { SearchDataGrid } from "../../components/Element/DataGrid/SearchDataGrid";
import { EditDataGrid } from "../../components/Element/DataGrid/EditDataGrid";
import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { useUsers } from "../../features/users/api/getUsers";

type CustomGridColDef = GridColDef & { order: number };

const UserColumns: CustomGridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, order: 1 },
  { field: "createdAt", headerName: "作成日時", flex: 1, order: 2 },
  { field: "updatedAt", headerName: "更新日時", flex: 1, order: 3 },
  { field: "role", headerName: "アカウントタイプ", flex: 1, order: 4 },
  { field: "username", headerName: "ユーザー名", flex: 1, order: 5 },
  { field: "email", headerName: "メールアドレス", flex: 1, order: 6 },
  { field: "phone", headerName: "電話番号", flex: 1, order: 7 },
];

export const UsersList = () => {
  const navigate = useNavigate();

  const [columns, setColumns] = useState(UserColumns);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const { isLoading, isError, data: users } = useUsers({});

  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  const handleSearch = () => {
    // Search logic
    // Implement your search logic based on the selectedColumn and searchText
    // For example, filter the users array based on the selected column and search text
    // Update the filtered users in state
    console.log("いま!");
  };

  if (isLoading) {
    return <LoadingBox message="ユーザーを取得しています" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラー"
        description="ユーザーデータの取得に失敗しました。ネットワーク環境を確認してください。"
      />
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <EditDataGrid
        defaultColumns={UserColumns}
        columns={columns}
        setColumns={setColumns}
      />

      <SearchDataGrid
        defaultColumns={UserColumns}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />

      <Box mt={2}>
        <CustomDataGrid
          onRowClick={handleRowClick}
          rows={users}
          columns={columns}
        />
      </Box>
    </Box>
  );
};
