import { Box, BoxProps } from "@mui/material";

export const ContentBox = ({ children, ...props }: BoxProps) => {
  return <Box p={1}>{children}</Box>;
};
