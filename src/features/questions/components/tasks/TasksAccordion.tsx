import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { Question } from "../../types/question.class";
import { QuestionTaskAccordion } from "../../../tasks/QuestionTaskAccordion";
import { TaskStatus } from "../../../tasks/types/task-status.enum";
import { Role } from "../../../users/types/role.enum";
import { useContext } from "react";
import { RolesGuard } from "../../../../tools/RolesGuard";
import { AuthContext } from "../../../../providers/auth.provider";

type AnswerQuestionTaskAccordionProps = {
  question: Question;
} & Partial<AccordionProps>;

/**
 * Role.TEACHER or Role.ADMINのみ表示
 *
 */
export const QuestionTasksAccordion = ({
  question,
  ...props
}: AnswerQuestionTaskAccordionProps) => {
  const { user } = useContext(AuthContext);
  if (
    user.role !== Role.TEACHER &&
    user.role !== Role.ADMIN &&
    !Array.isArray(question?.tasks)
  ) {
    return null;
  }
  return (
    <RolesGuard roles={[Role.ADMIN, Role.TEACHER]}>
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
              .sort((a, b) => b.createdAt?.getTime() - a.createdAt?.getTime())
              .map((task) => (
                <QuestionTaskAccordion question={question} task={task} />
              ))
          )}
        </AccordionDetails>
      </Accordion>
    </RolesGuard>
  );
};
