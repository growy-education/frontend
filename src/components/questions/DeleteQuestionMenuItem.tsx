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
import { useNavigate } from "react-router-dom";

type DeleteQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const DeleteQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: DeleteQuestionMenuItemProps) => {
  const navigate = useNavigate();
  const { deleteQuestionById } = useContext(QuestionContext);
  const disabled = useMemo(
    () => question.status !== QuestionStatus.CANCELED,
    [question.status]
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
    if (onClick) {
      onClick(null);
    }
  }, [deleteQuestionById, navigate, onClick, question.id, sending]);

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
          質問を削除する
        </Typography>
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="delete-question-alert-dialog-title"
        aria-describedby="delete-question-alert-dialog-description"
      >
        <DialogTitle id="delete-question-alert-dialog-title">
          {"本当に質問を削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-question-alert-dialog-description">
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
