import { Box, BoxProps } from "@mui/material";
import { Question } from "../../../dto/question.class";
import { CancelQuestionButton } from "./CancelQuestionButton";
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useRef } from "react";
import { QuestionStatus } from "../../../dto/enum/question-status.enum";
import { QuestionContext } from "../../../contexts/QuestionContextProvider";
import { EditButton } from "../../components/EditButton";

type EditingQuestionBoxProps = {
  question: Question;
} & BoxProps;

export const EditingQuestionBox = ({
  question,
  ...props
}: EditingQuestionBoxProps) => {
  const navigate = useNavigate();
  const { cancelQuestionById } = useContext(QuestionContext);
  const sending = useRef(false);

  const handleClick = useCallback(() => {
    sending.current = true;
    cancelQuestionById(question.id).finally(() => (sending.current = false));
  }, [cancelQuestionById, question.id]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...props}
    >
      <CancelQuestionButton
        question={question}
        onClick={handleClick}
        disabled={
          sending.current || question.status === QuestionStatus.CANCELED
        }
      />
      <EditButton
        disabled={question.status !== QuestionStatus.PENDING}
        onClick={() => {
          navigate(`/questions/${question.id}/edit`);
        }}
      />
    </Box>
  );
};
