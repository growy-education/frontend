import { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { LoadingBox } from "../../components/LoadingData";
import { QuestionCard } from "../../components/questions/QuestionCard";
import { YetNoQuestionBox } from "../../components/questions/YetNoQuestionBox";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { QuestionStatus } from "../../dto/enum/question-status.enum";

export const QuestionListPage = () => {
  const { questions, getQuestions } = useContext(QuestionContext);
  const [fetching, setFetching] = useState(false);
  const [noMoreData, setNoMoreData] = useState(false);

  const handleLoadMore = () => {
    if (fetching) {
      return;
    }
    setFetching(true);
    getQuestions({ take: 10, skip: questions.length }).finally(() =>
      setFetching(false)
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <PageTitleTypography>質問リスト</PageTitleTypography>
      <Box p={2}>
        {questions.length === 0 && <YetNoQuestionBox />}
        {questions
          .filter((question) => question.status !== QuestionStatus.CANCELED)
          .map((question) => (
            <QuestionCard
              key={`question-${question.id}`}
              question={question}
              sx={{ marginBottom: 3 }}
            />
          ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoadMore}
          disabled={fetching}
        >
          {fetching ? "読み込んでいます..." : "もっと読み込む"}
        </Button>
      </Box>
    </Box>
  );
};

// type CustomGridColDef = GridColDef & { order: number };

// const QuestionColumns: CustomGridColDef[] = [
//   { field: "id", headerName: "ID", flex: 1, order: 1 },
//   { field: "createdAt", headerName: "質問日時", flex: 1, order: 2 },
//   { field: "updatedAt", headerName: "更新日時", flex: 1, order: 3 },
//   { field: "title", headerName: "タイトル", flex: 1, order: 4 },
//   { field: "content", headerName: "内容", flex: 1, order: 5 },
//   { field: "memo", headerName: "備考", flex: 1, order: 6 },
//   {
//     field: "available",
//     headerName: "視聴可能",
//     flex: 1,
//     renderCell: (params: GridRenderCellParams): React.ReactNode => {
//       const isAvailable = params.value as boolean;
//       return isAvailable ? <CircleOutlined /> : <Close />;
//     },
//     order: 7,
//   },
//   {
//     field: "student",
//     headerName: "生徒",
//     valueFormatter: (params: GridValueFormatterParams<Student>) => {
//       return params.value.id;
//     },
//     flex: 1,
//     order: 7,
//   },
//   { field: "teacher", headerName: "講師", flex: 1, order: 8 },
// ];

/* <EditDataGrid
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
      </Box> */
