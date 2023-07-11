import { Box, BoxProps } from "@mui/material";

export const AttentionBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      p={2}
      sx={{
        backgroundColor: "#E5F9EF",
        borderRadius: "1rem",
      }}
    >
      {children}
    </Box>
  );
};
