import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import * as Fuse from "fuse.js";

import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { useUsers } from "../../features/users/api/getUsers";
import { User } from "../../features/users/types/user.class";
import { SearchTextField } from "../../components/Element/TextField/SearchTextField";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "createdAt", headerName: "作成日時", flex: 1 },
  { field: "updatedAt", headerName: "更新日時", flex: 1 },
  { field: "role", headerName: "アカウントタイプ", flex: 1 },
  { field: "username", headerName: "ユーザー名", flex: 1 },
  { field: "email", headerName: "メールアドレス", flex: 1 },
  { field: "phone", headerName: "電話番号", flex: 1 },
];

export const UsersList = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState<string>("");

  const { isLoading, isError, data: users } = useUsers({});

  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
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

  const options: Fuse.IFuseOptions<User> = {
    keys: ["id", "username", "email", "phone"],
  };
  const fuse = new Fuse.default(users, options);
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
          rows={
            searchText === "" ? users : results.map((result) => result.item)
          }
          columns={columns}
        />
      </Box>
    </Box>
  );
};
