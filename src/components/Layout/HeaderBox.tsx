import { Box, BoxProps } from "@mui/material";

export const HeaderBox = (props: BoxProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    />
  );
};
