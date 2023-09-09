import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { CheckQuestionAnswerForm } from "./CheckQuestionAnswerForm";
import { Question } from "../../dto/question.class";

type CheckQuestionAnswerAccordionProps = {
  question: Question;
} & Partial<AccordionProps>;

export const CheckQuestionAnswerAccordion = ({
  question,
  ...props
}: CheckQuestionAnswerAccordionProps) => {
  return (
    <Accordion {...props}>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="check-question-answer-accordion"
        id="check-question-answer-accordion"
      >
        <Typography>回答動画をチェックする</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CheckQuestionAnswerForm question={question} />
      </AccordionDetails>
    </Accordion>
  );
};
