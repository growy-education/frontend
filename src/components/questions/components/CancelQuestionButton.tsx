import { useCallback, useContext, useMemo, useState } from "react";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";

import { Question } from "../../../dto/question.class";
import { QuestionStatus } from "../../../dto/enum/question-status.enum";
import { QuestionContext } from "../../../contexts/QuestionContextProvider";

type CancelQuestionButtonProps = {
  question: Question;
} & ButtonProps;

export const CancelQuestionButton = ({
  question,
  ...props
}: CancelQuestionButtonProps) => {
  const { cancelQuestionById } = useContext(QuestionContext);
  const disabled = useMemo(
    () => question.status !== QuestionStatus.PENDING,
    [question.status]
  );

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleCancel = () => setOpen(false);

  const handleClick = () => setOpen(true);

  const handleConfirm = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    cancelQuestionById(question.id).finally(() => {
      setSending(false);
      setOpen(false);
    });
  }, [cancelQuestionById, question.id, sending]);

  return (
    <>
      <Button
        variant="outlined"
        color="error"
        endIcon={
          <Cancel
            sx={{
              color: !disabled && !sending && !!!props.disabled && "error.main",
            }}
          />
        }
        disabled={disabled || sending}
        onClick={handleClick}
        {...props}
      >
        質問をキャンセル
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"本当に質問をキャンセルしますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            キャンセルすると質問は削除され、確認できなくなります。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>キャンセルしない</Button>
          <Button onClick={handleConfirm} autoFocus>
            キャンセルする
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
