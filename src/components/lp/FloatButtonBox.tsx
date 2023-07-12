import { Box, BoxProps } from "@mui/material";

export const FloatButtonBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      position="fixed"
      bottom={1}
      zIndex={100}
      sx={{
        width: "100%",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
