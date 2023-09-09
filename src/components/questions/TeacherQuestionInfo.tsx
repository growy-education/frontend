import { Typography } from "@mui/material";
import { useContext, useEffect, useMemo } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { UserContext } from "../../contexts/UserContextProvider";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { Question } from "../../dto/question.class";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { useNavigate } from "react-router-dom";
import { plainToInstance } from "class-transformer";

const QuestionColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "タイトル", flex: 1 },
  {
    field: "reaction",
    headerName: "対応",
    flex: 2,
    valueFormatter: (params: GridValueFormatterParams<string>) => {
      return <Typography color="error">{params.value}</Typography>;
    },
  },
];

class CustomQuestion extends Question {
  reaction: string;
}

export const TeacherQuestionInfo = () => {
  const { questions, getQuestions } = useContext(QuestionContext);

  const navigate = useNavigate();

  useEffect(() => {
    getQuestions({
      statuses: [QuestionStatus.PENDING, QuestionStatus.ASSIGNED],
    });
  }, [getQuestions]);

  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`/questions/${rowId}`);
  };

  const reactionRequiredQuestions: CustomQuestion[] = useMemo(
    () =>
      questions.reduce((result, question) => {
        if (
          question.status === QuestionStatus.PENDING &&
          Date.now() - question.createdAt.getTime() > 12 * 60 * 60 * 1000
        ) {
          const customQuestion = plainToInstance(CustomQuestion, question);
          customQuestion.reaction = "質問の確認が必要です";
          result.push(customQuestion);
        }
        if (
          question.status === QuestionStatus.ASSIGNED &&
          Date.now() - question.createdAt.getTime() > 24 * 60 * 60 * 1000
        ) {
          const customQuestion = plainToInstance(CustomQuestion, question);
          customQuestion.reaction = "質問に回答してください";
          result.push(customQuestion);
        }
        return result;
      }, [] as CustomQuestion[]),
    [questions]
  );

  return (
    <>
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
    </>
  );
};
