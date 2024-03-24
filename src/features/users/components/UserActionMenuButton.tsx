import { ButtonProps } from "@mui/material";
import { useState } from "react";
import { UserActionButton } from "./UserActionButton";
import { UserActionMenu } from "./UserActionMenu";
import { User } from "../types/user.class";
import { EditUserMenuItem } from "./EditUserMenuItem";
import { DebugUserMenuItem } from "./DebugUserMenuItem";

type UserActionMenuButtonProps = {
  user: User;
} & ButtonProps;

export const UserActionMenuButton = ({
  user,
  ...props
}: UserActionMenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <UserActionButton
        aria-controls={open ? "user-action-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        {...props}
      />
      <UserActionMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <EditUserMenuItem />
        <DebugUserMenuItem user={user} />
      </UserActionMenu>
    </>
  );
};
