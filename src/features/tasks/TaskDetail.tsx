import { Box, Typography } from "@mui/material";

import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { Task } from "./types/task.class";
import { JaDateTimeTypography } from "../../components/Element/Typography/JaDateTimeTypography";
import { useContext } from "react";
import { Role } from "../users/types/role.enum";
import { TaskStatus } from "./types/task-status.enum";
import { TaskStatusTypgraphy } from "./TaskStatusTypography";
import { QuestionAnswerBox } from "../questions/components/QuestionAnswerBox";
import { TaskType } from "./types/task-type.enum";
import { TaskTitle } from "./components/title/TaskTitle";
import { CompleteQuestionTaskButton } from "./CompleteQuestionTaskButton";
import { RetryQuestionTaskButton } from "./RetryQuestionTaskButton";
import { HeadEditBox } from "../HeadEditBox";
import { AuthContext } from "../../providers/auth.provider";

type TaskDetailProps = {
  task: Task;
};
export const TaskDetail = ({ task, ...props }: TaskDetailProps) => {
  const { user } = useContext(AuthContext);

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
