import { Box, BoxProps } from "@mui/material";

export const VoiceBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      style={{ display: "flex", alignItems: "center", width: "100%" }}
      {...props}
    >
      {children}
    </Box>
  );
};
