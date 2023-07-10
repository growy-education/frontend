import { Box, BoxProps } from "@mui/material";

export const VoiceImageBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box component="figure" width="10rem" {...props}>
      {children}
    </Box>
  );
};
