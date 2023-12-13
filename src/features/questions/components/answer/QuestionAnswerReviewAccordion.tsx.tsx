import {
  Accordion,
  AccordionProps,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Question } from "../../types/question.class";
import { ExpandMore } from "@mui/icons-material";

type QuestionAnswerFeedBackAccordion = {
  question: Question;
  answer: string;
} & Partial<AccordionProps>;

export const QuestionAnswerFeedbackAccordion = ({
  question,
  answer,
  ...props
}: QuestionAnswerFeedBackAccordion) => {
  return (
    <Accordion {...props}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`question-${question.id}-answer-${answer}-feedback-summary`}
        id={`question-${question.id}-answer-${answer}-feedback-summary`}
      >
        <Typography>回答動画を評価する</Typography>
      </AccordionSummary>
      <QuestionAnswerFeedbackAccordion question={question} answer={answer} />
    </Accordion>
  );
};
