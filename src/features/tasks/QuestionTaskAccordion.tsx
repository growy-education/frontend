import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { Task } from "./types/task.class";
import { TaskStatus } from "./types/task-status.enum";
import { ExpandMore } from "@mui/icons-material";
import { useContext } from "react";
import { Role } from "../users/types/role.enum";
import { TaskHeaderBox } from "./TaskHeaderBox";
import { TaskDetail } from "./TaskDetail";
import { AnswerTaskQuestionForm } from "../questions/AnswerQuestionTaskForm";
import { AuthContext } from "../../providers/auth.provider";
import { Question } from "../questions/types/question.class";

type QuestionTaskAccordionProps = {
  question: Question;
  task: Task;
} & Partial<AccordionProps>;

export const QuestionTaskAccordion = ({
  question,
  task,
  ...props
}: QuestionTaskAccordionProps) => {
  const { user } = useContext(AuthContext);
  return (
    <Accordion
      key={`question-task-accordion-task-id-${task.id}`}
      {...props}
      sx={{
        backgroundColor:
          task.status === TaskStatus.REJECTED
            ? (theme) => `${theme.palette.warning.main}10`
            : "",
        ...props.sx,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <Typography>{task.title}</Typography>
          {user.role === Role.ADMIN && task.status === TaskStatus.REVIEWING && (
            <Typography
              variant="caption"
              sx={{
                color: "warning.main",
              }}
            >
              回答動画のチェックをしてください
            </Typography>
          )}
          {[TaskStatus.ASSIGNED, TaskStatus.IN_PROGRESS].includes(
            task.status
          ) && (
            <Typography
              variant="caption"
              sx={{
                color: "warning.main",
              }}
            >
              タスクに回答してください
            </Typography>
          )}
          {task.status === TaskStatus.REJECTED && (
            <Typography
              variant="caption"
              sx={{
                color: "warning.main",
              }}
            >
              拒否済みです
            </Typography>
          )}
          {task.status === TaskStatus.CANCELED && (
            <Typography
              variant="caption"
              sx={{
                color: "error.main",
              }}
            >
              キャンセル済みです
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {user.role === Role.ADMIN && (
          <>
            <TaskHeaderBox task={task} />
            <TaskDetail task={task} />
          </>
        )}
        {user.role === Role.TEACHER &&
          ([TaskStatus.ASSIGNED, TaskStatus.IN_PROGRESS].includes(
            task.status
          ) ? (
            <AnswerTaskQuestionForm question={question} task={task} />
          ) : (
            <TaskDetail task={task} />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};
