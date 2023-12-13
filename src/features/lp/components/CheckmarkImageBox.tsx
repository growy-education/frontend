import { Box, BoxProps } from "@mui/material";

export const CheckmarkImageBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box mr={1} {...props}>
      {children}
    </Box>
  );
};
