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
import { useNavigate } from "react-router-dom";

type DeleteQuestionButtonProps = {
  question: Question;
} & ButtonProps;

export const DeleteQuestionButton = ({
  question,
  ...props
}: DeleteQuestionButtonProps) => {
  const navigate = useNavigate();
  const { deleteQuestionById } = useContext(QuestionContext);
  const disabled = useMemo(
    () => question.status !== QuestionStatus.CANCELED,
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
    deleteQuestionById(question.id)
      .then((error) => {
        if (!!!error) {
          navigate("/questions");
        }
      })
      .finally(() => {
        setSending(false);
      });
    setOpen(false);
  }, [deleteQuestionById, question.id, sending]);

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
        質問を削除する
      </Button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"本当に質問を削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            質問を削除すると、データは完全に削除され復元できなくなります。
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
