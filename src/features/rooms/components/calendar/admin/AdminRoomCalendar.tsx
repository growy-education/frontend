import { useNavigate } from "react-router-dom";
import { CalendarProps } from "react-calendar";
import {
  OnChangeFunc,
  TileDisabledFunc,
} from "react-calendar/dist/cjs/shared/types";
import { Room } from "../../../types/room.class";
import { AdminTileContent } from "./AdminTileContent";
import { StyledCalendar } from "../../../../../components/Element/Calendar/StyledCalendar";

type AdminRoomCalendarProps = CalendarProps & {
  rooms: Room[];
};

// カスタムのカレンダーコンポーネント
export const AdminRoomCalendar = ({
  rooms,
  ...props
}: AdminRoomCalendarProps) => {
  const navigate = useNavigate();

  const tileDisabled: TileDisabledFunc = ({ date, view }) => {
    return false;
  };

  // オンライン自習室が開催される日であれば、その詳細ページへと遷移
  // そうでなければ、作成ページへ飛ぶ
  const onClickDay: OnChangeFunc = (date) => {
    const room = rooms.find(
      (room) =>
        date.getTime() < room.startAt.getTime() &&
        room.startAt.getTime() < date.getTime() + 24 * 60 * 60 * 1000
    );
    if (room) {
      return navigate(`/rooms/${room.id}`);
    } else {
      return navigate(`/rooms/new`, { state: { date } });
    }
  };

  return (
    <StyledCalendar
      tileClassName={null}
      tileContent={({ date, view }) => (
        <AdminTileContent rooms={rooms} date={date} view={view} />
      )}
      // 日付はtileContentで描画しているので不要
      formatDay={() => ""}
      tileDisabled={tileDisabled}
      onClickDay={onClickDay}
      {...props}
    />
  );
};
