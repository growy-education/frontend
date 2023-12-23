import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { Room } from "../../types/room.class";
import { useDeleteRoom } from "../../api/deleteRoom";
import { Delete, EventAvailable } from "@mui/icons-material";
import { RolesGuard } from "../../../../tools/RolesGuard";
import { Role } from "../../../users/types/role.enum";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

type DeleteRoomMenuItemProps = {
  room: Room;
} & MenuItemProps;

export const DeleteRoomMenuItem = ({
  room,
  onClick,
  ...props
}: DeleteRoomMenuItemProps) => {
  const navigate = useNavigate();
  const mutation = useDeleteRoom({
    options: {
      onSettled: (_, error) => {
        if (!(error instanceof AxiosError)) {
          navigate("/rooms");
        }
      },
    },
  });

  const handleClick = () => {
    mutation.mutate({ roomId: room.id });
  };

  return (
    <RolesGuard roles={[Role.ADMIN]}>
      <MenuItem
        onClick={handleClick}
        disableRipple
        color="primary.main"
        disabled={mutation.isPending}
        {...props}
      >
        <Delete color="primary" />
        <Typography color="primary" ml={1}>
          削除する
        </Typography>
      </MenuItem>
    </RolesGuard>
  );
};
