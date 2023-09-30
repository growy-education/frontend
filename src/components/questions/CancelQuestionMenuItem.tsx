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
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { Cancel } from "@mui/icons-material";

type CancelQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const CancelQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: CancelQuestionMenuItemProps) => {
  const { cancelQuestionById } = useContext(QuestionContext);

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
    cancelQuestionById(question.id).finally(() => {
      setSending(false);
    });
    setOpen(false);
    if (onClick) {
      onClick(null);
    }
  }, [cancelQuestionById, onClick, question.id, sending]);

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        disabled={sending}
        {...props}
      >
        <Cancel color="error" />
        <Typography color="error" ml={1}>
          キャンセルする
        </Typography>
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="cancel-question-alert-dialog-title"
        aria-describedby="cancel-question-alert-dialog-description"
      >
        <DialogTitle id="cancel-question-alert-dialog-title">
          {"本当に質問をキャンセルしますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="cancel-question-alert-dialog-description">
            キャンセルすると、質問には回答動画が作成されなくなります。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>キャンセルしない</Button>
          <Button onClick={handleConfirm} color="warning">
            キャンセルする
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
