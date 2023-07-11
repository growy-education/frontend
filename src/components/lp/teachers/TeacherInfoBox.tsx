import { Box, BoxProps } from "@mui/material";

export const TeacherInfoBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box mb={1} style={{ display: "flex", width: "100%" }} {...props}>
      {children}
    </Box>
  );
};
