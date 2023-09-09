import { useRef } from "react";
import { Box, BoxProps, Button } from "@mui/material";

import { Question } from "../../dto/question.class";
import { QuestionAnswerCheckBox } from "./QuestionAnswerCheckBox";
import { QuestionAnswerBox } from "./components/QuestionAnswerBox";

import { RejectQuestionAnswerButton } from "./RejectQuestionAnswerButton";
import { VerifyQuestionAnswerButton } from "./VerifyQuestionAnswerButton";

type CheckQuestionAnswerFormProps = {
  question: Question;
} & BoxProps<"form">;

export const CheckQuestionAnswerForm = ({
  question,
  ...props
}: CheckQuestionAnswerFormProps) => {
  return (
    <Box m={2} component="form" {...props}>
      <QuestionAnswerBox answer={question.answer} />
      <QuestionAnswerCheckBox />
      <RejectQuestionAnswerButton question={question} />
      <VerifyQuestionAnswerButton question={question} />
    </Box>
  );
};