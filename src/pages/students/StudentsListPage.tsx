import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import Fuse from "fuse.js";

import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { useStudents } from "../../features/students/api/getStudents";
import { useState } from "react";
import { SearchTextField } from "../../components/Element/TextField/SearchTextField";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "createdAt", headerName: "作成日時", flex: 1 },
  { field: "updatedAt", headerName: "更新日時", flex: 1 },
  { field: "firstName", headerName: "お名前", flex: 1 },
  { field: "firstNameKana", headerName: "お名前（フリガナ）", flex: 1 },
  { field: "lastName", headerName: "苗字", flex: 1 },
  { field: "lastNameKana", headerName: "苗字（フリガナ）", flex: 1 },
];

export const StudentsList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");

  const { isLoading, isError, data: students } = useStudents();

  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  if (isLoading) {
    return <LoadingBox message="生徒情報を取得中" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="ネットワークエラー"
        description="生徒データの取得に失敗しました。ネットワーク環境を確認してください。"
      />
    );
  }

  const fuse = new Fuse(students, {
    keys: ["id", "fistName", "firstNameKana", "lastName", "lastNameKana"],
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
            searchText === "" ? students : results.map((result) => result.item)
          }
        />
      </Box>
    </Box>
  );
};
