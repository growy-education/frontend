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

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...props}
    >
      <CancelQuestionButton question={question} />
      <EditButton
        disabled={question.status !== QuestionStatus.PENDING}
        onClick={() => {
          navigate(`/questions/${question.id}/edit`);
        }}
      />
    </Box>
  );
};
