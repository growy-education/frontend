import { Box, BoxProps } from "@mui/material";

export const VoiceTextBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box textAlign={"left"} {...props}>
      {children}
    </Box>
  );
};
