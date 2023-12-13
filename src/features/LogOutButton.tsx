import { useState } from "react";
import { IconButton } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { ConfirmationDialog } from "../components/Element/Dialog/ConfirmationDialog";
import { useLogout } from "./auth/api/logout";

export const LogOutButton = () => {
  const [open, setOpen] = useState(false);
  const mutation = useLogout();

  const handleCancel = () => setOpen(false);
  const handleClick = () => setOpen(true);
  const handleConfirm = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(undefined);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <LogoutIcon />
      </IconButton>
      <ConfirmationDialog
        labelName={"add-task-to-question"}
        open={open}
        title={"ログアウトしますか？"}
        contentText={"ログアウトすると、再度ログインが必要になります。"}
        cancelText="ログアウトしない"
        confirmText="ログアウトする"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
