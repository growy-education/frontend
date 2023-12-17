import { ButtonProps } from "@mui/material";
import { ActionButton } from "../../../../components/Element/Button/ActionButton";

export const QuestionActionButton = (props: ButtonProps) => {
  return (
    <ActionButton id="question-action-button" {...props}>
      質問を操作する
    </ActionButton>
  );
};
