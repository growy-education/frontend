import { Box, BoxProps } from "@mui/material";
import { RejectQuestionButton } from "../RejectQuestionButton";
import { AssignQuestionButton } from "./AssignQuestionButton";
import { Question } from "../../../dto/question.class";
import { QuestionStatus } from "../../../dto/enum/question-status.enum";

type AssigningQuestionBoxProps = {
  question: Question;
} & BoxProps;

export const ConfirmQuestionBox = ({
  question,
  ...props
}: AssigningQuestionBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...props}
    >
      <RejectQuestionButton question={question} />
      <AssignQuestionButton question={question} />
    </Box>
  );
};
