import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { AssignmentTurnedIn } from "@mui/icons-material";

import { Question } from "../../../types/question.class";
import { QuestionStatus } from "../../../types/question-status.enum";
import { useConfirmQuestion } from "../../../api/confirmQuestion";

type ConfirmQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const ConfirmQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: ConfirmQuestionMenuItemProps) => {
  const mutation = useConfirmQuestion();

  const handleClick = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ questionId: question.id });
    if (onClick) {
      onClick(null);
    }
  };

  return (
    <MenuItem
      onClick={handleClick}
      disableRipple
      color="primary.main"
      disabled={
        mutation.isPending || question.status !== QuestionStatus.PENDING
      }
      {...props}
    >
      <AssignmentTurnedIn color="primary" />
      <Typography color="primary" ml={1}>
        質問を確認する
      </Typography>
    </MenuItem>
  );
};
