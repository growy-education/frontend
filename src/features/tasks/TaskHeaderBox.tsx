import { Box, BoxProps } from "@mui/material";
import { Task } from "./types/task.class";
import { DeleteTaskMenuItem } from "./DeleteTaskMenuItem";

type TaskHeaderBoxProps = {
  task: Task;
} & BoxProps;

export const TaskHeaderBox = ({ task, ...props }: TaskHeaderBoxProps) => {
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
