import { Menu, MenuProps } from "@mui/material";

export const ActionMenu = (props: MenuProps) => {
  return (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  );
};
