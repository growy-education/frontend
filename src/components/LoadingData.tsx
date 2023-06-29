import { Box, BoxProps, CircularProgress, Typography } from "@mui/material";

type LoadingDataProps = BoxProps & {
  message: string;
};

export const LoadingData = ({ message, ...props }: LoadingDataProps) => {
  return (
    <Box alignItems={"center"} justifyContent={"center"} {...props}>
      <Typography>{message}</Typography>
      <CircularProgress />
    </Box>
  );
};
