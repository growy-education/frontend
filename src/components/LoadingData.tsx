import { Box, BoxProps, CircularProgress, Typography } from "@mui/material";

type LoadingPageProps = BoxProps & {
  message: string;
};

export const LoadingData = ({ message, ...props }: LoadingPageProps) => {
  return (
    <Box alignItems={"center"} justifyContent={"center"} {...props}>
      <Typography>{message}</Typography>
      <CircularProgress />
    </Box>
  );
};
