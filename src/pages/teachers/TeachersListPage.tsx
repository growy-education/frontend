import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { EditDataGrid } from "../../components/Element/DataGrid/EditDataGrid";
import { CustomDataGrid } from "../../components/Element/DataGrid/CustomDataGrid";
import { SearchDataGrid } from "../../components/Element/DataGrid/SearchDataGrid";
import { AlertBox } from "../../features/AlertBox";
import { LoadingBox } from "../../features/LoadingData";
import { useTeachers } from "../../features/teachers/api/getTeachers";

type CustomGridColDef = GridColDef & { order: number };

const TeacherColumns: CustomGridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, order: 1 },
  { field: "createdAt", headerName: "作成日時", flex: 1, order: 2 },
  { field: "updatedAt", headerName: "更新日時", flex: 1, order: 3 },
  { field: "firstName", headerName: "お名前", flex: 1, order: 4 },
  {
    field: "firstNameKana",
    headerName: "お名前（フリガナ）",
    flex: 1,
    order: 5,
  },
  { field: "lastName", headerName: "苗字", flex: 1, order: 6 },
  { field: "lastNameKana", headerName: "苗字（フリガナ）", flex: 1, order: 7 },
  { field: "status", headerName: "ステータス", flex: 1, order: 8 },
  {
    field: "assignedQuestionsNumber",
    headerName: "質問タスク数",
    flex: 1,
    order: 9,
  },
];

export const TeachersList = () => {
  const navigate = useNavigate();

  const [columns, setColumns] = useState<CustomGridColDef[]>(TeacherColumns);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const { isLoading, isError, data: teachers } = useTeachers();

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
    return <LoadingBox message="講師情報を取得中" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="ネットワークエラーが発生しました"
        description="講師情報の取得に失敗しました"
      />
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <EditDataGrid
        defaultColumns={TeacherColumns}
        columns={columns}
        setColumns={setColumns}
      />

      <SearchDataGrid
        defaultColumns={TeacherColumns}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />

      <Box mt={2}>
        <CustomDataGrid
          onRowClick={handleRowClick}
          rows={teachers}
          columns={columns}
        />
      </Box>
    </Box>
  );
};
