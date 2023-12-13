import { Delete, Info, MoreVert, Sync } from "@mui/icons-material";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { ImageEntity } from "./types/image.class";

type UploadingImageActionProps = {
  file: File;
  image: ImageEntity;
  removeFile: (file: File) => void;
  resendFile: (file: File) => void;
};

export const UploadingImageAction = ({
  file,
  image,
  removeFile,
  resendFile,
}: UploadingImageActionProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleResend = () => {
    resendFile(file);
  };
  const handleRemove = () => {
    removeFile(file);
  };

  return (
    <>
      <IconButton
        id="uploading-image-icon-button"
        aria-controls={open ? "uploading-image-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVert sx={{ color: "white" }} />
      </IconButton>
      <Menu
        id="uploading-image-menu"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "uploading-image-icon-button",
        }}
      >
        <MenuItem
          onClick={handleResend}
          disabled={image instanceof ImageEntity}
        >
          <ListItemIcon>
            <Sync />
          </ListItemIcon>
          <ListItemText>再送する</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleRemove}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>削除する</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
