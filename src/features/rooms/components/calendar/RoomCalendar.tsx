import { CalendarProps } from "react-calendar";
import { Room } from "../../types/room.class";

import { useContext } from "react";
import { AuthContext } from "../../../../providers/auth.provider";
import { Role } from "../../../users/types/role.enum";
import { AdminRoomCalendar } from "./admin/AdminRoomCalendar";
import { CustomerRoomCalendar } from "./customer/CustomerRoomCalendar";
import { TeacherRoomCalendar } from "./teacher/TeacherRoomCalendar";

type CustomCalendarProps = CalendarProps & {
  rooms: Room[];
};

// カスタムのカレンダーコンポーネント
export const RoomCalendar = ({ rooms, ...props }: CustomCalendarProps) => {
  const { user } = useContext(AuthContext);

  if (user.role === Role.ADMIN) {
    return <AdminRoomCalendar rooms={rooms} />;
  } else if (user.role === Role.TEACHER) {
    return <TeacherRoomCalendar rooms={rooms} />;
  } else {
    return <CustomerRoomCalendar rooms={rooms} />;
  }
};
