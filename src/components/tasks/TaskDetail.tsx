import { Box, Typography } from "@mui/material";

import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { Task } from "../../dto/task.class";
import { JaDateTimeTypography } from "../components/Typography/JaDateTimeTypography";
import { UserContext } from "../../contexts/UserContextProvider";
import { useContext } from "react";
import { Role } from "../../dto/enum/role.enum";
import { TeacherAccordion } from "../teachers/TeacherAccordion";
import { TaskStatus } from "../../dto/enum/task-status.enum";
import { TaskStatusTypgraphy } from "./TaskStatusTypography";
import { QuestionAnswerBox } from "../questions/components/QuestionAnswerBox";
import { TaskType } from "../../dto/enum/task-type.enum";
import { AnswerTaskQuestionForm } from "../questions/AnswerQuestionTaskForm";
import { TaskTitle } from "./TaskTitle";
import { CompleteQuestionTaskButton } from "./CompleteQuestionTaskButton";
import { RetryQuestionTaskButton } from "./RetryQuestionTaskButton";
import { HeadEditBox } from "../HeadEditBox";
import { TaskHeaderBox } from "./TaskHeaderBox";

type TaskDetailProps = {
  task: Task;
};
export const TaskDetail = ({ task, ...props }: TaskDetailProps) => {
  const { user } = useContext(UserContext);

  const {
    id,
    createdAt,
    title,
    type,
    status,
    startAt,
    endAt,
    answer,
    question,
    teacher,
  } = task;

  return (
    <>
      <Box my={1}>
        <TaskTitle task={task} />
        <HeadlineTypography>ID</HeadlineTypography>
        <Typography>{id}</Typography>
        <HeadlineTypography>作成日時</HeadlineTypography>
        <JaDateTimeTypography date={createdAt} />
        <HeadlineTypography>種類</HeadlineTypography>
        <Typography>質問回答</Typography>
        <HeadlineTypography>ステータス</HeadlineTypography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <TaskStatusTypgraphy status={status} />
        </Box>
        <HeadlineTypography>開始時刻</HeadlineTypography>
        <JaDateTimeTypography date={startAt} />
        <HeadlineTypography>終了時刻</HeadlineTypography>
        <JaDateTimeTypography date={endAt} />
        {type === TaskType.QUESTION_ANSWER &&
          (task.status === TaskStatus.REVIEWING || TaskStatus.COMPLETED) && (
            <>
              <HeadlineTypography>回答動画</HeadlineTypography>
              <QuestionAnswerBox answer={answer} />
            </>
          )}
        {user.role === Role.ADMIN && status === TaskStatus.REVIEWING && (
          <HeadEditBox>
            <RetryQuestionTaskButton task={task} />
            <CompleteQuestionTaskButton task={task} />
          </HeadEditBox>
        )}
      </Box>
    </>
  );
};
