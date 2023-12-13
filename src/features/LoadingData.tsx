import { Box, BoxProps, CircularProgress, Typography } from "@mui/material";

type LoadingDataProps = BoxProps & {
  message: string;
};

export const LoadingBox = ({ message, ...props }: LoadingDataProps) => {
  return (
    <Box
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      <Box sx={{ margin: "auto" }}>
        <Typography>{message}</Typography>
        <CircularProgress />
      </Box>
    </Box>
  );
};
