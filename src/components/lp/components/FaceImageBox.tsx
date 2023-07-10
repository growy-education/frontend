import { Box, BoxProps } from "@mui/material";

export const FaceImageBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box component="figure" {...props}>
      {children}
    </Box>
  );
};
