import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";

export const NotFound = () => {
  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="h4" align="center" gutterBottom>
        ページが見つかりませんでした。
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        ホームに戻る
      </Button>
    </Container>
  );
};
