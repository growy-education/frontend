import { ButtonProps } from "@mui/material";
import { useState } from "react";
import { RoomActionButton } from "./RoomActionButton";
import { RoomActionMenu } from "./RoomActionMenu";
import { ReserveRoomMenuItem } from "./ReserveRoomMenuItem";
import { CancelReservationMenuItem } from "./CancelReservationMenuItem";
import { Room } from "../../types/room.class";
import { DeleteRoomMenuItem } from "./DeleteMenuItem";

type RoomActionMenuButtonProps = {
  room: Room;
} & ButtonProps;

export const RoomActionMenuButton = ({
  room,
  ...props
}: RoomActionMenuButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <RoomActionButton
        aria-controls={open ? "room-action-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        {...props}
      />
      <RoomActionMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <ReserveRoomMenuItem room={room} />
        <CancelReservationMenuItem room={room} />
        <DeleteRoomMenuItem room={room} />
      </RoomActionMenu>
    </>
  );
};
