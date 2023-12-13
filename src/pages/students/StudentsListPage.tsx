import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { useStudents } from "../../features/students/api/getStudents";

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
