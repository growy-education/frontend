import { useCallback, useState } from "react";
import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { Notifications } from "@mui/icons-material";

import { Question } from "../../../types/question.class";
import { QuestionStatus } from "../../../types/question-status.enum";
import { ConfirmationDialog } from "../../../../../components/Element/Dialog/ConfirmationDialog";
import { useSendNotificationQuestion } from "../../../api/useSendNotificationQuestion";

type SendNotificationQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const SendNotificationQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: SendNotificationQuestionMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useSendNotificationQuestion({
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

  return (
    <>
      <MenuItem onClick={handleClick} disableRipple {...props}>
        <Notifications color="warning" />
        <Typography color="warning.main" ml={1}>
          生徒にアナウンス
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        labelName={"remind-question"}
        open={open}
        title={"生徒ににアナウンスしますか？"}
        contentText={"生徒のスペースにアナウンスメッセージが送信されます。"}
        cancelText="キャンセル"
        confirmText="確認"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
