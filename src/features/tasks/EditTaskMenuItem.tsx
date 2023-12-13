import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { useCallback } from "react";
import { Task } from "./types/task.class";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";

type EditTaskMenuItemProps = {
  task: Task;
} & MenuItemProps;

export const EditTaskMenuItem = ({
  task,
  onClick,
  ...props
}: EditTaskMenuItemProps) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(`/tasks/${task.id}/edit`);
    onClick(null);
  }, [navigate, onClick, task.id]);

  return (
    <MenuItem
      onClick={handleClick}
      disableRipple
      color="primary.main"
      {...props}
    >
      <Edit color="primary" />
      <Typography color="primary" ml={1}>
        編集する
      </Typography>
    </MenuItem>
  );
};
