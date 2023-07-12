import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Teacher } from "../../types/teacher.class";
import { EditDataGrid } from "../../components/components/DataGrid/EditDataGrid";
import { CustomDataGrid } from "../../components/components/DataGrid/CustomDataGrid";
import { SearchDataGrid } from "../../components/components/DataGrid/SearchDataGrid";

type CustomGridColDef = GridColDef & { order: number };

const TeacherColumns: CustomGridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, order: 1 },
  { field: "createdAt", headerName: "作成日時", flex: 1, order: 2 },
  { field: "updatedAt", headerName: "更新日時", flex: 1, order: 3 },
  { field: "firstName", headerName: "お名前", flex: 1, order: 4 },
  {
    field: "firstNameKana",
    headerName: "お名前（読み仮名）",
    flex: 1,
    order: 5,
  },
  { field: "lastName", headerName: "苗字", flex: 1, order: 6 },
  { field: "lastNameKana", headerName: "苗字（読み仮名）", flex: 1, order: 7 },
  { field: "status", headerName: "ステータス", flex: 1, order: 8 },
  {
    field: "assignedQuestionsNumber",
    headerName: "質問タスク数",
    flex: 1,
    order: 9,
  },
];

export const TeachersList = () => {
  const [columns, setColumns] = useState<CustomGridColDef[]>(TeacherColumns);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const { axiosConfig } = useContext(AxiosContext);

  const navigate = useNavigate();
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
      .get("teachers")
      .then((response) => {
        console.log(response.data);
        const teachers = response.data.map((teacherJson: string) =>
          plainToInstance(Teacher, teacherJson)
        );
        setTeachers(teachers);
      })
      .catch((error) =>
        console.log("error occurred at TeachersList.tsx", error)
      );
  }, [axiosConfig]);

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
