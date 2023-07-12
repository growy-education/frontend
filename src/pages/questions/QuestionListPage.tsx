import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import {
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { CircleOutlined, Close } from "@mui/icons-material";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Question } from "../../types/question.class";
import { CustomDataGrid } from "../../components/CustomDataGrid";
import { SearchDataGrid } from "../../components/SearchDataGrid";
import { EditDataGrid } from "../../components/EditDataGrid";
import { Student } from "../../types/student.class";
import { QuestionCard } from "../../components/questions/QuestionCard";

type CustomGridColDef = GridColDef & { order: number };

const QuestionColumns: CustomGridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, order: 1 },
  { field: "createdAt", headerName: "質問日時", flex: 1, order: 2 },
  { field: "updatedAt", headerName: "更新日時", flex: 1, order: 3 },
  { field: "title", headerName: "タイトル", flex: 1, order: 4 },
  { field: "content", headerName: "内容", flex: 1, order: 5 },
  { field: "memo", headerName: "備考", flex: 1, order: 6 },
  {
    field: "available",
    headerName: "視聴可能",
    flex: 1,
    renderCell: (params: GridRenderCellParams): React.ReactNode => {
      const isAvailable = params.value as boolean;
      return isAvailable ? <CircleOutlined /> : <Close />;
    },
    order: 7,
  },
  {
    field: "student",
    headerName: "生徒",
    valueFormatter: (params: GridValueFormatterParams<Student>) => {
      return params.value.id;
    },
    flex: 1,
    order: 7,
  },
  { field: "teacher", headerName: "講師", flex: 1, order: 8 },
];

export const QuestionList = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const [columns, setColumns] = useState(QuestionColumns);
  const [questions, setQuestions] = useState<Question[]>([]);
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
      .get("questions")
      .then((response) => {
        if (!Array.isArray(response.data)) {
          throw new Error("ネットワークエラー");
        }
        const questions = response.data.map((userJson: string) => {
          return plainToInstance(Question, userJson);
        });
        console.log(questions);

        setQuestions(questions);
      })
      .catch((error) =>
        console.log("error occurred at QuestionList.tsx", error)
      );
  }, [axiosConfig]);

  return (
    <Box sx={{ width: "100%" }}>
      <Box p={2}>
        {questions.map((question) => (
          <QuestionCard key={`question-${question.id}`} question={question} />
        ))}
      </Box>

      {/* <EditDataGrid
        defaultColumns={QuestionColumns}
        columns={columns}
        setColumns={setColumns}
      />

      <SearchDataGrid
        defaultColumns={QuestionColumns}
        selectedColumn={selectedColumn}
        setSelectedColumn={setSelectedColumn}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
      />

      <Box mt={2}>
        <CustomDataGrid
          onRowClick={handleRowClick}
          rows={questions}
          columns={columns}
        />
      </Box> */}
    </Box>
  );
};
