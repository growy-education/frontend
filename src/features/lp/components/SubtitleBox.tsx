import { Box, BoxProps } from "@mui/material";

export const SubtitleBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      pt={1}
      pb={1}
      mt={2}
      mb={2}
      sx={{ backgroundColor: "primary.main" }}
      {...props}
    >
      {children}
    </Box>
  );
};
