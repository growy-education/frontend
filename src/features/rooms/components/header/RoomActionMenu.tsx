import { MenuProps } from "@mui/material";
import { ActionMenu } from "../../../../components/Element/Menu/ActionMenu";

export const RoomActionMenu = (props: MenuProps) => {
  return (
    <ActionMenu
      id="room-action-menu"
      MenuListProps={{
        "aria-labelledby": "room-action-button",
      }}
      {...props}
    />
  );
};
