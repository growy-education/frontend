import { Typography } from "@mui/material";
import { useContext } from "react";
import { QuestionStatus } from "../../types/question-status.enum";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Question } from "../../types/question.class";
import { HeadlineTypography } from "../../../../components/Element/Typography/HeadlineTypography";
import { useNavigate } from "react-router-dom";
import { plainToInstance } from "class-transformer";
import { AuthContext } from "../../../../providers/auth.provider";
import { useQuestions } from "../../api/getQuestions";

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

export const TeacherQuestionInfo = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  const reactionRequiredQuestions: CustomQuestion[] = questions.reduce(
    (result, question) => {
      if (question?.teacher?.id !== user.teacher.id) {
        return result;
      }
      if (question.status === QuestionStatus.PENDING) {
        const customQuestion = plainToInstance(CustomQuestion, question);
        customQuestion.reaction = "質問の確認が必要です";
        result.push(customQuestion);
        return result;
      }
      if (question.status === QuestionStatus.ASSIGNED) {
        const customQuestion = plainToInstance(CustomQuestion, question);
        customQuestion.reaction = "質問に回答してください";
        result.push(customQuestion);
        return result;
      }
      return result;
    },
    [] as CustomQuestion[]
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
