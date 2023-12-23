import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { useContext } from "react";
import { Room } from "../../types/room.class";
import { AuthContext } from "../../../../providers/auth.provider";
import { Cancel } from "@mui/icons-material";
import { useCancelReservation } from "../../api/cancelReservationRoom";
import { RolesGuard } from "../../../../tools/RolesGuard";
import { Role } from "../../../users/types/role.enum";

type CancelReservationMenuItemProps = {
  room: Room;
} & MenuItemProps;

export const CancelReservationMenuItem = ({
  room,
  onClick,
  ...props
}: CancelReservationMenuItemProps) => {
  const { user } = useContext(AuthContext);
  const mutation = useCancelReservation();

  const handleClick = () => {
    mutation.mutate(room.id);
  };

  if (!room.students.some((student) => student.id === user?.student?.id)) {
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
        <Cancel color="warning" />
        <Typography color="warning" ml={1}>
          予約をキャンセル
        </Typography>
      </MenuItem>
    </RolesGuard>
  );
};
