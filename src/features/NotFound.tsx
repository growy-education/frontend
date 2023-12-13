import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import { Home } from "@mui/icons-material";
import { PageTitleTypography } from "../components/Element/Typography/PageTitleTypography";

export const NotFound = () => {
  return (
    <Container>
      <PageTitleTypography>404 Not Found</PageTitleTypography>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img
          src="/notfound.png"
          alt="NotFound"
          style={{ width: "90%", maxWidth: "640px" }}
        />
        <Button
          component={Link}
          to="/home"
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
