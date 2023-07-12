import { Box, BoxProps } from "@mui/material";

export const PageWrapperBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      component="main"
      width="md"
      maxWidth="500px"
      overflow="hidden"
      sx={{ margin: "0 auto" }}
      {...props}
    >
      {children}
    </Box>
  );
};
