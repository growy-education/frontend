import { Box, BoxProps } from "@mui/material";

export const WhiteBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      p={1}
      style={{
        backgroundColor: "rgba(255, 255, 254, 0.85)",
        borderRadius: "2rem",
        display: "flex",
        textAlign: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
