import { useNavigate } from "react-router-dom";
import { CalendarProps } from "react-calendar";
import {
  OnChangeFunc,
  TileDisabledFunc,
} from "react-calendar/dist/cjs/shared/types";
import { Room } from "../../../types/room.class";
import { StyledCalendar } from "../../../../../components/Element/Calendar/StyledCalendar";
import { CustomerCalendarTileContent } from "./CustomerTileContent";

type CustomerCalendarProps = CalendarProps & {
  rooms: Room[];
};

// カスタムのカレンダーコンポーネント
export const CustomerRoomCalendar = ({
  rooms,
  ...props
}: CustomerCalendarProps) => {
  const navigate = useNavigate();

  // オンライン自習室が開催されない日は押せない
  const tileDisabled: TileDisabledFunc = ({ date, view }) => {
    if (view !== "month") {
      return false;
    }
    const room = rooms.find(
      (room) =>
        date.getTime() < room.startAt.getTime() &&
        room.startAt.getTime() < date.getTime() + 24 * 60 * 60 * 1000
    );
    return !!!room;
  };

  // オンライン自習室が開催される日であれば、その詳細ページへと遷移する
  const onClickDay: OnChangeFunc = (date) => {
    const room = rooms.find(
      (room) =>
        date.getTime() < room.startAt.getTime() &&
        room.startAt.getTime() < date.getTime() + 24 * 60 * 60 * 1000
    );
    if (room) {
      return navigate(`/rooms/${room.id}`);
    }
  };

  return (
    <StyledCalendar
      tileClassName={null}
      tileContent={({ date, view }) => (
        <CustomerCalendarTileContent rooms={rooms} date={date} view={view} />
      )}
      // 日付はtileContentで描画しているので不要
      formatDay={() => ""}
      tileDisabled={tileDisabled}
      onClickDay={onClickDay}
      {...props}
    />
  );
};
