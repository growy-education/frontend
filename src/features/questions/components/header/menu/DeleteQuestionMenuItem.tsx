import { useCallback, useMemo, useState } from "react";
import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { AssignmentLate } from "@mui/icons-material";

import { useDeleteQuestion } from "../../../api/deleteQuestion";
import { Question } from "../../../types/question.class";
import { QuestionStatus } from "../../../types/question-status.enum";
import { ConfirmationDialog } from "../../../../../components/Element/Dialog/ConfirmationDialog";

type DeleteQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const DeleteQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: DeleteQuestionMenuItemProps) => {
  const disabled = useMemo(
    () => question.status !== QuestionStatus.CANCELED,
    [question.status]
  );

  const [open, setOpen] = useState(false);

  const mutation = useDeleteQuestion({
    options: {
      onSettled: () => {
        handleCancel();
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
    mutation.mutate({ questionId: question.id });
    if (onClick) {
      onClick(null);
    }
  }, [mutation, onClick, question.id]);

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        disabled={disabled && mutation.isPending && props.disabled}
        {...props}
      >
        <AssignmentLate color={"error"} />
        <Typography color="error.main" ml={1}>
          質問を削除する
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        labelName={"delete-question"}
        open={open}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
        title={"質問を削除しますか？"}
        contentText={
          "質問を削除すると、データは完全に削除され復元できなくなります。"
        }
      />
    </>
  );
};
