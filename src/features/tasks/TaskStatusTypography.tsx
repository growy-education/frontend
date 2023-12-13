import { Typography, TypographyProps } from "@mui/material";
import { TaskStatus } from "./types/task-status.enum";

type TaskStatusTypographyProps = {
  status: TaskStatus;
} & TypographyProps;

const getStatusText = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return "完了済み";
    case TaskStatus.REVIEWING:
      return "運営が確認中";
    case TaskStatus.IN_PROGRESS:
      return "タスク進行中";
    case TaskStatus.ASSIGNED:
      return "講師が確認済み";
    case TaskStatus.PENDING:
      return "講師の確認を待機中";
    case TaskStatus.REJECTED:
      return "拒否済み";
    case TaskStatus.CANCELED:
      return "キャンセル済み";
  }
};

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETED:
      return "success";
    case TaskStatus.REVIEWING:
      return "info";
    case TaskStatus.IN_PROGRESS:
      return "info";
    case TaskStatus.ASSIGNED:
      return "info";
    case TaskStatus.PENDING:
      return "warning";
    case TaskStatus.REJECTED:
      return "warning";
    case TaskStatus.CANCELED:
      return "error";
  }
};

export const TaskStatusTypgraphy = ({
  status,
  ...props
}: TaskStatusTypographyProps) => {
  return (
    <Typography color={getStatusColor(status)}>
      {getStatusText(status)}
    </Typography>
  );
};
