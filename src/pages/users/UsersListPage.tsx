import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { User } from "../../types/user.class";
import { CustomDataGrid } from "../../components/components/DataGrid/CustomDataGrid";
import { SearchDataGrid } from "../../components/components/DataGrid//SearchDataGrid";
import { EditDataGrid } from "../../components/components/DataGrid//EditDataGrid";

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
  const { axiosConfig } = useAxiosConfig();
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [columns, setColumns] = useState(UserColumns);
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
      .catch((error) => {
        console.log("error occurred at UsersList.tsx", error);
      });
  }, [axiosConfig]);

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
