import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { useContext } from "react";
import { Room } from "../../types/room.class";
import { useReserveRoom } from "../../api/reserveRoom";
import { AuthContext } from "../../../../providers/auth.provider";
import { EventAvailable } from "@mui/icons-material";
import { RolesGuard } from "../../../../tools/RolesGuard";
import { Role } from "../../../users/types/role.enum";

type ReserveRoomMenuItemProps = {
  room: Room;
} & MenuItemProps;

export const ReserveRoomMenuItem = ({
  room,
  onClick,
  ...props
}: ReserveRoomMenuItemProps) => {
  const { user } = useContext(AuthContext);
  const mutation = useReserveRoom();

  const handleClick = () => {
    mutation.mutate({ roomId: room.id });
  };

  if (room.students.some((student) => student.id === user?.student?.id)) {
    return <></>;
  }

  return (
    <RolesGuard roles={[Role.CUSTOMER]}>
      <MenuItem
        onClick={handleClick}
        disableRipple
        color="primary.main"
        disabled={mutation.isPending}
        {...props}
      >
        <EventAvailable color="primary" />
        <Typography color="primary" ml={1}>
          予約する
        </Typography>
      </MenuItem>
    </RolesGuard>
  );
};
