import { Box, BoxProps } from "@mui/material";

export const PageWrapperBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      component="main"
      sx={{
        width: "100%",
        maxWidth: "700px",
        margin: "0 auto",
        overflow: "hidden",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
