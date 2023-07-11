import { Box, BoxProps } from "@mui/material";

export const AttentionDescriptionBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box display={"flex"} alignItems={"start"} {...props}>
      {children}
    </Box>
  );
};
