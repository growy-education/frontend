import { CalendarProps } from "react-calendar";
import { CustomCalendar } from "./CustomCalendar";
import { Room } from "../types/room.class";
import {
  OnChangeFunc,
  TileDisabledFunc,
} from "react-calendar/dist/cjs/shared/types";
import { createSearchParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

type ScheduledEvents = {
  [key: string]: AdminCustomCalendarProps["events"];
};

type AdminCustomCalendarProps = CalendarProps & {
  events: Room[];
};

export const AdminCustomCalendar = ({
  events,
  ...props
}: AdminCustomCalendarProps) => {
  const navigate = useNavigate();

  let scheduledEvents: ScheduledEvents = {};
  for (const event of events) {
    // プロパティがなければ、配列をプロパティに追加する
    if (!scheduledEvents[dayjs(event.startAt).format("YYYY-MM-DD")]) {
      scheduledEvents[dayjs(event.startAt).format("YYYY-MM-DD")] = [];
    }
    // プロパティにeventを追加する
    scheduledEvents[dayjs(event.startAt).format("YYYY-MM-DD")].push(event);
  }

  // 常に選択できる
  const tileDisabled: TileDisabledFunc = () => {
    return false;
  };

  const onClickDay: OnChangeFunc = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    if (
      formattedDate in scheduledEvents &&
      Array.isArray(scheduledEvents[formattedDate]) &&
      scheduledEvents[formattedDate].length > 0
    ) {
      return navigate(`/rooms/${scheduledEvents[formattedDate]}`);
    }

    return navigate({
      pathname: "/rooms/new",
      search: createSearchParams({
        startAt: date.toString(),
        endAt: date.toString(),
      }).toString(),
    });
  };
  return (
    <CustomCalendar
      events={events}
      tileDisabled={tileDisabled}
      onClickDay={onClickDay}
      {...props}
    />
  );
};
