import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  MenuItemProps,
  Typography,
} from "@mui/material";
import { AssignmentLate } from "@mui/icons-material";

import { Task } from "../../dto/task.class";
import { TaskStatus } from "../../dto/enum/task-status.enum";
import { QuestionContext } from "../../contexts/QuestionContextProvider";

type DeleteTaskMenuItemProps = {
  task: Task;
} & MenuItemProps;

export const DeleteTaskMenuItem = ({
  task,
  onClick,
  ...props
}: DeleteTaskMenuItemProps) => {
  const { deleteQuestionTaskById } = useContext(QuestionContext);
  const disabled = useMemo(
    () => task.status !== TaskStatus.CANCELED,
    [task.status]
  );

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleCancel = () => {
    setOpen(false);
    if (onClick) {
      onClick(null);
    }
  };

  const handleClick = () => setOpen(true);

  const handleConfirm = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    deleteQuestionTaskById(task.id).finally(() => {
      setSending(false);
    });
    setOpen(false);
    if (onClick) {
      onClick(null);
    }
  }, [deleteQuestionTaskById, onClick, task.id, sending]);

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        disabled={disabled && sending && props.disabled}
        {...props}
      >
        <AssignmentLate color={"error"} />
        <Typography color="error.main" ml={1}>
          タスクを削除する
        </Typography>
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="delete-task-alert-dialog-title"
        aria-describedby="delete-task-alert-dialog-description"
      >
        <DialogTitle id="delete-task-alert-dialog-title">
          {"本当にタスクを削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-task-alert-dialog-description">
            タスクを削除すると、データは完全に削除され復元できなくなります。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>削除しない</Button>
          <Button onClick={handleConfirm} color="warning">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
