import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

export const LogOutButton = () => {
  const { handleLogout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleCancel = () => setOpen(false);
  const handleClick = () => setOpen(true);
  const handleConfirm = () => handleLogout();

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <LogoutIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"本当にログアウトしますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ログアウトすると、再度ログインが必要になります
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="error">
            ログアウトしない
          </Button>
          <Button onClick={handleConfirm} autoFocus>
            ログアウトする
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
