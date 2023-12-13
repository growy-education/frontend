import { useCallback, useMemo, useState } from "react";
import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { AssignmentLate } from "@mui/icons-material";

import { useRejectQuestion } from "../../../api/rejectQuestion";
import { Question } from "../../../types/question.class";
import { QuestionStatus } from "../../../types/question-status.enum";
import { ConfirmationDialog } from "../../../../../components/Element/Dialog/ConfirmationDialog";

type RejectQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const RejectQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: RejectQuestionMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useRejectQuestion({
    options: {
      onSettled: () => setOpen(false),
    },
  });

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
        disabled={disabled || mutation.isPending || props.disabled}
        {...props}
      >
        <AssignmentLate color={"warning"} />
        <Typography color="warning.main" ml={1}>
          回答を拒否する
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        open={open}
        labelName="report-question"
        title="質問を拒否しますか？"
        contentText="質問を拒否すると、質問は他の講師に割り当てられます。"
        cancelText="拒否しない"
        confirmText="拒否する"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
