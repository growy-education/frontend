import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, SwipeableDrawer, Toolbar } from "@mui/material";
import { useState } from "react";
import { HeaderMenu } from "./HeaderMenu";

export const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <AppBar
      color="primary"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        backgroundColor: "rgba(246, 246, 246, 0.85)",
      }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          src="/img/logo-min.png"
          alt="header-logo"
          style={{
            height: "40px",
            marginLeft: "16px",
            width: "auto",
            zIndex: 100,
          }}
        />
        <IconButton onClick={() => setOpen(!open)} color="primary">
          <Menu fontSize="large" />
        </IconButton>
      </Toolbar>
      <SwipeableDrawer
        anchor="top"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        PaperProps={{ sx: { backgroundColor: "primary.main" } }}
      >
        <HeaderMenu setOpen={setOpen} />
      </SwipeableDrawer>
    </AppBar>
  );
};
