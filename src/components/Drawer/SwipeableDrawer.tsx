import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  IconButton,
  SwipeableDrawer as MuiSwipeableDrawer,
  Toolbar,
} from "@mui/material";
import { DrawerListItem } from "./DrawerListItem";

type SwipeableDrawerProps = {
  isSidebarOpen: boolean;
  handleToggleSidebar: () => void;
};

export const SwipeableDrawer = ({
  isSidebarOpen,
  handleToggleSidebar,
}: SwipeableDrawerProps) => {
  return (
    <MuiSwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onOpen={handleToggleSidebar}
      onClose={handleToggleSidebar}
      sx={{ width: "auto" }}
    >
      <Toolbar>
        <IconButton
          onClick={handleToggleSidebar}
          onKeyDown={handleToggleSidebar}
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <DrawerListItem />
    </MuiSwipeableDrawer>
  );
};
