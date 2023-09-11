import { Box, BoxProps } from "@mui/material";

export const HeadEditBox = (props: BoxProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...props}
    />
  );
};
