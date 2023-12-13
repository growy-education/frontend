import { Box, BoxProps } from "@mui/material";

export const TitleBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box pt={2} pb={2} sx={{ backgroundColor: "primary.main" }} {...props}>
      {children}
    </Box>
  );
};
