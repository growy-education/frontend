import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Question } from "../../types/question.class";
import { QuestionStatus } from "../../types/question-status.enum";
import { HeadlineTypography } from "../../../../components/Element/Typography/HeadlineTypography";

import { plainToInstance } from "class-transformer";
import { useQuestions } from "../../api/getQuestions";
import { LoadingBox } from "../../../LoadingData";

const QuestionColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "title", headerName: "タイトル", flex: 1 },
  {
    field: "reaction",
    headerName: "対応",
    flex: 2,
  },
];
class CustomQuestion extends Question {
  reaction: string;
}

export const AdminQuestionInfo = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    data: questions,
  } = useQuestions({
    filterDto: {
      statuses: [
        QuestionStatus.PENDING,
        QuestionStatus.ASSIGNED,
        QuestionStatus.CHECKING,
      ],
    },
  });

  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`/questions/${rowId}`);
  };

  const getReactionRequired = (questions: Question[]) => {
    return questions
      .reduce((result, question) => {
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
      }, [] as CustomQuestion[])
      .map((value) => {
        if (value.isTrainingForTeacher) {
          value.reaction = "*" + value.reaction;
        }
        return value;
      });
  };

  if (isLoading) {
    return <LoadingBox message="質問情報を取得中" />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      {getReactionRequired(questions).length === 0 ? (
        <Typography>リアクションが必要な質問はありません</Typography>
      ) : (
        <>
          <HeadlineTypography>リアクションが必要な質問</HeadlineTypography>
          <DataGrid
            columns={QuestionColumns}
            rows={getReactionRequired(questions)}
            onRowClick={handleRowClick}
          />
        </>
      )}
    </Box>
  );
};
