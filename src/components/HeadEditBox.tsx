import { Box, BoxProps } from "@mui/material";

export const HeadEditBox = (props: BoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...props}
    />
  );
};
