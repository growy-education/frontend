import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { AnswerQuestionForm } from "./AnswerQuestionForm";
import { Question } from "../../dto/question.class";

type AnswerQuestionAccordionProps = {
  question: Question;
} & Partial<AccordionProps>;

export const AnswerQuestionAccordion = ({
  question,
  ...props
}: AnswerQuestionAccordionProps) => {
  return (
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>質問に回答する</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <AnswerQuestionForm question={question} />
      </AccordionDetails>
    </Accordion>
  );
};
