import { useContext } from "react";
import { Room } from "../types/room.class";
import { AuthContext } from "../../../providers/auth.provider";
import { Role } from "../../users/types/role.enum";
import { Alert } from "@mui/material";

export const RoomReservableAlert = ({ room }: { room: Room }) => {
  const { user } = useContext(AuthContext);
  const now = new Date();

  if (user.role !== Role.CUSTOMER) {
    return null;
  }

  if (room.startAt.getTime() < now.getTime()) {
    return (
      <Alert severity="error">
        開催済みのため、こちらの自習室は予約できません。
      </Alert>
    );
  }
  if (room.startAt.getTime() - 2 * 24 * 60 * 60 * 1000 < now.getTime()) {
    return (
      <Alert severity="error">
        開催直前のため、こちらの自習室は予約できません。
      </Alert>
    );
  }

  return null;
};
