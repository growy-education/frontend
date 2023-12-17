import { useState } from "react";
import { TeacherActionButton } from "./TeacherActionButton";
import { TeacherActionMenu } from "./TeacherActionMenu";
import { ButtonProps } from "@mui/material";

export const TeacherActionMenuButton = (props: ButtonProps) => {
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
      <TeacherActionButton
        aria-controls={open ? "teacher-action-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        {...props}
      />
      <TeacherActionMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      ></TeacherActionMenu>
    </>
  );
};
