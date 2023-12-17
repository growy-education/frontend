import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const EditUserMenuItem = (props: MenuItemProps) => {
  const navigate = useNavigate();
  const handleOpen = () => navigate("edit");

  return (
    <MenuItem
      onClick={handleOpen}
      disableRipple
      color="primary.main"
      {...props}
    >
      <Edit color="primary" />
      <Typography color="primary" ml={1}>
        編集する
      </Typography>
    </MenuItem>
  );
};
