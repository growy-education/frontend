import { useContext } from "react";
import { Alert, Box, BoxProps } from "@mui/material";
import { Question } from "../../dto/question.class";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { AnswerQuestionAccordion } from "./AnswerQuestionAccordion";
import { ConfirmQuestionBox } from "./components/ConfirmQuestionBox";
import { UserContext } from "../../contexts/UserContextProvider";

type TeacherEditQuestionBoxProps = {
  question: Question;
} & BoxProps;

export const TeacherEditQuestionBox = ({
  question,
  ...props
}: TeacherEditQuestionBoxProps) => {
  const { user } = useContext(UserContext);

  return (
    <Box {...props}>
      {user.teacher.id !== question?.teacher?.id ? (
        <Alert severity="info" sx={{ justifyContent: "center" }}>
          この質問は他の講師に割り当てられています
        </Alert>
      ) : (
        <>
          <ConfirmQuestionBox question={question} />
          {question.status === QuestionStatus.ASSIGNED && (
            <AnswerQuestionAccordion question={question} />
          )}
        </>
      )}
    </Box>
  );
};
