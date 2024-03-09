import { useCallback, useState } from "react";
import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { Notifications } from "@mui/icons-material";

import { Question } from "../../../types/question.class";
import { QuestionStatus } from "../../../types/question-status.enum";
import { ConfirmationDialog } from "../../../../../components/Element/Dialog/ConfirmationDialog";
import { useRemindQuestion } from "../../../api/useRemindQuestion";

type RemindQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const RemindQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: RemindQuestionMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useRemindQuestion({
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
    mutation.mutate({ questionId: question.id });
    if (onClick) {
      onClick(null);
    }
  }, [mutation, onClick, question.id]);

  if (
    question.status !== QuestionStatus.PENDING &&
    question.status !== QuestionStatus.ASSIGNED
  ) {
    return <></>;
  }

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        {...props}
        disabled={mutation.isPending || props.disabled}
      >
        <Notifications color="warning" />
        <Typography color="warning.main" ml={1}>
          講師にリマインド
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        labelName={"remind-question"}
        open={open}
        title={"講師にリマインドしますか？"}
        contentText={"講師のDMにリマインドメッセージが送信されます。"}
        cancelText="キャンセル"
        confirmText="確認"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
