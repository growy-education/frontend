import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { Question } from "../../dto/question.class";
import { QuestionTaskAccordion } from "../tasks/QuestionTaskAccordion";
import { TaskStatus } from "../../dto/enum/task-status.enum";
import { Role } from "../../dto/enum/role.enum";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";

type AnswerQuestionTaskAccordionProps = {
  question: Question;
} & Partial<AccordionProps>;

export const QuestionTasksAccordion = ({
  question,
  ...props
}: AnswerQuestionTaskAccordionProps) => {
  const { user } = useContext(UserContext);
  if (!Array.isArray(question?.tasks)) {
    return null;
  }
  return (
    <Accordion {...props}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <Typography>タスク一覧</Typography>
          {user.role === Role.ADMIN &&
            question.tasks.some(
              (task) => task.status === TaskStatus.REVIEWING
            ) && (
              <Typography
                variant="caption"
                sx={{
                  color: "warning.main",
                }}
              >
                回答動画のチェックをしてください
              </Typography>
            )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {Array.isArray(question?.tasks) && question.tasks.length === 0 ? (
          <Typography>タスクがありません</Typography>
        ) : (
          question.tasks
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .map((task) => <QuestionTaskAccordion task={task} />)
        )}
      </AccordionDetails>
    </Accordion>
  );
};
