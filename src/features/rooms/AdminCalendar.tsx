import { CalendarProps } from "react-calendar";
import { Room } from "./types/room.class";
import {
  OnChangeFunc,
  TileDisabledFunc,
} from "react-calendar/dist/cjs/shared/types";
import { useNavigate } from "react-router-dom";
import { StyledCalendar } from "../../components/Element/Calendar/StyledCalendar";

type AdminCalendarProps = CalendarProps & {
  rooms: Room[];
};

export const AdminCalendar = ({ rooms, ...props }: AdminCalendarProps) => {
  const navigate = useNavigate();

  // 常に選択できる
  const tileDisabled: TileDisabledFunc = () => {
    return false;
  };

  const onClickDay: OnChangeFunc = (date) => {
    const room = rooms.find(
      (room) =>
        date.getTime() < room.startAt.getTime() &&
        room.startAt.getTime() < date.getTime() + 24 * 60 * 60 * 1000
    );
    if (room) {
      return navigate(`/rooms/${room.id}`);
    } else {
      return navigate(`/rooms/new`, {
        state: {
          date,
        },
      });
    }
  };
  return (
    <StyledCalendar
      tileDisabled={tileDisabled}
      onClickDay={onClickDay}
      {...props}
    />
  );
};
