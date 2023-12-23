import { ButtonProps } from "@mui/material";
import { ActionButton } from "../../../../components/Element/Button/ActionButton";

export const RoomActionButton = (props: ButtonProps) => {
  return (
    <ActionButton id="room-action-button" {...props}>
      操作する
    </ActionButton>
  );
};
