import { Box, BoxProps } from "@mui/material";

export const TeacherDescriptionBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box style={{ margin: "auto" }} {...props}>
      {children}
    </Box>
  );
};
