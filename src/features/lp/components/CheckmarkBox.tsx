import { Box, BoxProps } from "@mui/material";

export const CheckmarkBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      mb={1}
      style={{
        display: "flex",
        alignItems: "start",
      }}
    >
      {children}
    </Box>
  );
};
