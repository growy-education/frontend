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
import { useCallback, useContext, useMemo, useState } from "react";
import { Question } from "../../dto/question.class";
import { AssignmentLate } from "@mui/icons-material";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { QuestionStatus } from "../../dto/enum/question-status.enum";

type RejectQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const RejectQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: RejectQuestionMenuItemProps) => {
  const { rejectQuestionById } = useContext(QuestionContext);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const disabled = useMemo(
    () =>
      question.status === QuestionStatus.CANCELED ||
      question.status === QuestionStatus.CHECKING ||
      question.status === QuestionStatus.AVAILABLE,
    [question.status]
  );

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
    rejectQuestionById(question.id).finally(() => {
      setSending(false);
    });
    if (onClick) {
      onClick(null);
    }
  }, [onClick, question.id, rejectQuestionById, sending]);

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        disabled={disabled && sending && props.disabled}
        {...props}
      >
        <AssignmentLate color={"warning"} />
        <Typography color="warning.main" ml={1}>
          回答を拒否する
        </Typography>
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="reject-question-dialog-title"
        aria-describedby="reject-question-dialog-description"
      >
        <DialogTitle id="reject-question-dialog-title">
          {"本当に質問を拒否しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="reject-question-dialog-description">
            質問を拒否すると、質問は他の講師に割り当てられます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>拒否しない</Button>
          <Button onClick={handleConfirm} color="warning">
            拒否する
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
