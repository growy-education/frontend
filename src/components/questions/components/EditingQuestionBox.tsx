import { Box, BoxProps } from "@mui/material";
import { Question } from "../../../dto/question.class";
import { CancelQuestionButton } from "./CancelQuestionButton";
import { useNavigate } from "react-router-dom";
import { QuestionStatus } from "../../../dto/enum/question-status.enum";
import { EditButton } from "../../components/EditButton";
import { DeleteQuestionButton } from "./DeleteQuestionButton";

type EditingQuestionBoxProps = {
  question: Question;
} & BoxProps;

export const EditingQuestionBox = ({
  question,
  ...props
}: EditingQuestionBoxProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...props}
    >
      {question.status === QuestionStatus.CANCELED ? (
        <DeleteQuestionButton question={question} />
      ) : (
        <CancelQuestionButton question={question} />
      )}
      <EditButton
        disabled={question.status !== QuestionStatus.PENDING}
        onClick={() => {
          navigate(`/questions/${question.id}/edit`);
        }}
      />
    </Box>
  );
};
