import { Box, BoxProps } from "@mui/material";

export const DescriptionBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box p={2} {...props}>
      {children}
    </Box>
  );
};
