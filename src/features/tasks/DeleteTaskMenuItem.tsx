import { useCallback, useState } from "react";
import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { AssignmentLate } from "@mui/icons-material";

import { Task } from "./types/task.class";
import { TaskStatus } from "./types/task-status.enum";
import { ConfirmationDialog } from "../../components/Element/Dialog/ConfirmationDialog";
import { useDeleteTask } from "./api/deleteTask";

type DeleteTaskMenuItemProps = {
  task: Task;
} & MenuItemProps;

export const DeleteTaskMenuItem = ({
  task,
  onClick,
  ...props
}: DeleteTaskMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useDeleteTask({
    options: {
      onSettled: () => {
        setOpen(false);
      },
    },
  });

  const handleCancel = () => {
    setOpen(false);
    if (onClick) {
      onClick(null);
    }
  };

  const handleClick = () => setOpen(true);

  const handleConfirm = useCallback(() => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: task.id });
    if (onClick) {
      onClick(null);
    }
  }, [mutation, onClick, task.id]);

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        disabled={
          task.status !== TaskStatus.CANCELED ||
          mutation.isPending ||
          props.disabled
        }
        {...props}
      >
        <AssignmentLate color={"error"} />
        <Typography color="error.main" ml={1}>
          タスクを削除する
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        open={open}
        labelName={"delete-task"}
        title={"タスクを削除しますか？"}
        contentText={
          "タスクを削除すると、データは完全に削除され復元できなくなります。"
        }
        cancelText="削除しない"
        confirmText="削除する"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
