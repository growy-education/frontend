import { ButtonProps } from "@mui/material";
import { ActionButton } from "../../../components/Element/Button/ActionButton";

export const UserActionButton = (props: ButtonProps) => {
  return (
    <ActionButton id="user-action-button" {...props}>
      ユーザーを操作する
    </ActionButton>
  );
};
