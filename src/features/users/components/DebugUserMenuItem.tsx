import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { Login } from "@mui/icons-material";
import { User } from "../types/user.class";
import { useDebugUser } from "../api/debugUser";
import { Role } from "../types/role.enum";

type DebugUserMenuItemProps = {
  user: User;
} & MenuItemProps;

export const DebugUserMenuItem = ({
  user,
  ...props
}: DebugUserMenuItemProps) => {
  const mutation = useDebugUser();
  const handleDebugUser = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ userId: user.id });
  };

  if (user.role === Role.PENDING) {
    return <></>;
  }

  return (
    <MenuItem
      onClick={handleDebugUser}
      disableRipple
      color="primary.main"
      {...props}
    >
      <Login color="primary" />
      <Typography color="primary" ml={1}>
        デバッグする
      </Typography>
    </MenuItem>
  );
};
