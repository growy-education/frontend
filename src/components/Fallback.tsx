//https://ja.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary

import { Sync } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export const Fallback = ({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box m={2}>
        <Typography>サイトで問題が発生しました</Typography>
      </Box>
      <Button
        variant="contained"
        color="warning"
        endIcon={<Sync />}
        onClick={() => window.location.reload()}
      >
        もう一度読み込む
      </Button>
    </Box>
  );
};
