import { Box, BoxProps, Button, Menu } from "@mui/material";
import { Task } from "../../dto/task.class";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";
import { EditTaskMenuItem } from "./EditTaskMenuItem";
import { DeleteTaskMenuItem } from "./DeleteTaskMenuItem";

type TaskHeaderBoxProps = {
  task: Task;
} & BoxProps;

export const TaskHeaderBox = ({ task, ...props }: TaskHeaderBoxProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
      {...props}
    >
      <DeleteTaskMenuItem task={task} />
    </Box>
  );
};
