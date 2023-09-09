import { useContext } from "react";
import { Box, BoxProps, Typography } from "@mui/material";
import { Question } from "../../dto/question.class";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { AnswerQuestionAccordion } from "./AnswerQuestionAccordion";
import { AssigningQuestionBox } from "./components/AssigningQuestionBox";
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
        <Typography>この質問は他の講師に割り当てられています.</Typography>
      ) : (
        <>
          <AssigningQuestionBox question={question} />
          {question.status === QuestionStatus.ASSIGNED && (
            <AnswerQuestionAccordion question={question} />
          )}
        </>
      )}
    </Box>
  );
};
