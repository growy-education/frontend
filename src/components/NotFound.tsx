import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button, Container, Box } from "@mui/material";
import { Home } from "@mui/icons-material";

export const NotFound = () => {
  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        404 Not Found
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src="/notfound.png"
          alt="NotFound"
          style={{ width: "90%", maxWidth: "640px" }}
        />
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          startIcon={<Home />}
        >
          ホームに戻る
        </Button>
      </Box>
    </Container>
  );
};
