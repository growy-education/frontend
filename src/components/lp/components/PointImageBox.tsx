import { Box, BoxProps } from "@mui/material";

export const PointImageBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box mr={3} {...props}>
      {children}
    </Box>
  );
};
