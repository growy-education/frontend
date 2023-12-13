import { useCallback, useState } from "react";
import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";

import { Question } from "../../../types/question.class";
import { useCancelQuestion } from "../../../api/cancelQuestion";

import { ConfirmationDialog } from "../../../../../components/Element/Dialog/ConfirmationDialog";
import { QuestionStatus } from "../../../types/question-status.enum";

type CancelQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const CancelQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: CancelQuestionMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useCancelQuestion({
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

  if (question.status !== QuestionStatus.PENDING) {
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
        <Cancel color="error" />
        <Typography color="error" ml={1}>
          キャンセルする
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        labelName={"cancel-question"}
        open={open}
        title={"質問をキャンセルしますか？"}
        contentText={
          "キャンセルすると、質問には回答動画が作成されなくなります。"
        }
        cancelText="キャンセルしない"
        confirmText="キャンセルする"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
