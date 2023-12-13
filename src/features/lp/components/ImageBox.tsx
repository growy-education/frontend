import { Box, BoxProps } from "@mui/material";

export const ImageBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box p={3} {...props}>
      {children}
    </Box>
  );
};
