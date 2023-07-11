import { Box, BoxProps } from "@mui/material";

export const TeacherBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
