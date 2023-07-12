import { Box, BoxProps, CircularProgress, Typography } from "@mui/material";

type PendingContextPageProps = {
  message: string;
} & BoxProps;

export const PendingContextPage = ({
  message,
  children,
  ...props
}: PendingContextPageProps) => {
  return (
    <Box
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      <Box pb={5} sx={{ margin: "auto" }}>
        <Typography>{message}</Typography>
        <CircularProgress />
      </Box>
    </Box>
  );
};
