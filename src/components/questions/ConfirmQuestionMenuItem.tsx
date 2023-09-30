import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { Question } from "../../dto/question.class";
import { AssignmentTurnedIn } from "@mui/icons-material";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { QuestionStatus } from "../../dto/enum/question-status.enum";

type ConfirmQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const ConfirmQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: ConfirmQuestionMenuItemProps) => {
  const { assignQuestionById } = useContext(QuestionContext);
  const [sending, setSending] = useState(false);

  const handleClick = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    assignQuestionById(question.id).finally(() => setSending(false));
    if (onClick) {
      onClick(null);
    }
  }, [sending, assignQuestionById, question.id, onClick]);

  return (
    <MenuItem
      onClick={handleClick}
      disableRipple
      color="primary.main"
      disabled={sending || question.status !== QuestionStatus.PENDING}
      {...props}
    >
      <AssignmentTurnedIn color="primary" />
      <Typography color="primary" ml={1}>
        質問を確認する
      </Typography>
    </MenuItem>
  );
};
