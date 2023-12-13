import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../components/Element/DataGrid/CustomDataGrid";
import { EditDataGrid } from "../../components/Element/DataGrid/EditDataGrid";
import { SearchDataGrid } from "../../components/Element/DataGrid/SearchDataGrid";
import { useCustomers } from "../../features/customers/api/getCustomers";
import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";

type CustomGridColDef = GridColDef & { order: number };

const CustomerColumns: CustomGridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, order: 1 },
  { field: "createdAt", headerName: "作成日時", flex: 1, order: 2 },
  { field: "updatedAt", headerName: "更新日時", flex: 1, order: 3 },
  { field: "firstName", headerName: "名前", flex: 1, order: 4 },
  { field: "firstNameKana", headerName: "名前（フリガナ）", order: 5 },
  { field: "lastName", headerName: "苗字", flex: 1, order: 6 },
  { field: "lastNameKana", headerName: "苗字（フリガナ）", flex: 1, order: 7 },
  { field: "relationship", headerName: "続柄", flex: 1, order: 8 },
];

export const CustomersListPage = () => {
  const navigate = useNavigate();
  const { isLoading, isError, data: customers } = useCustomers();

  const [columns, setColumns] = useState(CustomerColumns);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

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

  return (
    <Box sx={{ width: "100%" }}>
      <EditDataGrid
        defaultColumns={CustomerColumns}
        columns={columns}
        setColumns={setColumns}
      />

      <SearchDataGrid
        defaultColumns={CustomerColumns}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />

      <Box mt={2}>
        <CustomDataGrid
          onRowClick={handleRowClick}
          rows={customers}
          columns={columns}
        />
      </Box>
    </Box>
  );
};
