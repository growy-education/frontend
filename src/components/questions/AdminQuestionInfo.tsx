import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Question } from "../../dto/question.class";
import { useContext, useEffect, useMemo, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Student } from "../../dto/student.class";
import { EditDataGrid } from "../components/DataGrid/EditDataGrid";
import { CustomDataGrid } from "../components/DataGrid/CustomDataGrid";
import { plainToInstance } from "class-transformer";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";

type CustomGridColDef = GridColDef & { order: number };

const QuestionColumns: CustomGridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, order: 1 },
  { field: "title", headerName: "タイトル", flex: 1, order: 4 },
  {
    field: "reaction",
    headerName: "対応",
    flex: 2,
    order: 6,
  },
];

class CustomQuestion extends Question {
  reaction: string;
}

export const AdminQuestionInfo = () => {
  const { questions, getQuestions } = useContext(QuestionContext);

  const navigate = useNavigate();

  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`/questions/${rowId}`);
  };

  useEffect(() => {
    getQuestions({
      statuses: [
        QuestionStatus.PENDING,
        QuestionStatus.ASSIGNED,
        QuestionStatus.CHECKING,
      ],
    });
  }, []);

  const reactionRequiredQuestions: CustomQuestion[] = useMemo(
    () =>
      questions.reduce((result, question) => {
        if (
          question.status === QuestionStatus.PENDING &&
          question?.teacher === null
        ) {
          const customQuestion = plainToInstance(CustomQuestion, question);
          customQuestion.reaction = "講師を割り当ててください";
          result.push(customQuestion);
        }
        if (
          question.status === QuestionStatus.PENDING &&
          question?.teacher &&
          Date.now() - question.createdAt.getTime() > 12 * 60 * 60 * 1000
        ) {
          const customQuestion = plainToInstance(CustomQuestion, question);
          customQuestion.reaction = "質問の確認がされていません";
          result.push(customQuestion);
        }
        if (
          question.status === QuestionStatus.ASSIGNED &&
          Date.now() - question.createdAt.getTime() > 24 * 60 * 60 * 1000
        ) {
          const customQuestion = plainToInstance(CustomQuestion, question);
          customQuestion.reaction = "質問の回答期限を過ぎています";
          result.push(customQuestion);
        }
        if (question.status === QuestionStatus.CHECKING) {
          const customQuestion = plainToInstance(CustomQuestion, question);
          customQuestion.reaction = "回答動画のチェックをしてください";
          result.push(customQuestion);
        }
        return result;
      }, [] as CustomQuestion[]),
    [questions]
  );

  return (
    <Box sx={{ width: "100%" }}>
      {reactionRequiredQuestions.length === 0 ? (
        <Typography>リアクションが必要な質問はありません</Typography>
      ) : (
        <>
          <HeadlineTypography>リアクションが必要な質問</HeadlineTypography>
          <DataGrid
            columns={QuestionColumns}
            rows={reactionRequiredQuestions}
            onRowClick={handleRowClick}
          />
        </>
      )}
    </Box>
  );
};
