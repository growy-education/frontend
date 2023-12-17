import { MenuProps } from "@mui/material";
import { ActionMenu } from "../../../components/Element/Menu/ActionMenu";

export const UserActionMenu = (props: MenuProps) => {
  return (
    <ActionMenu
      id="user-action-menu"
      MenuListProps={{
        "aria-labelledby": "user-action-button",
      }}
      {...props}
    />
  );
};
