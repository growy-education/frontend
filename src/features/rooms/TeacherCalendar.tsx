import { useContext, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { Box, Typography, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import { Room } from "./types/room.class";
import {
  NavigationLabelFunc,
  OnChangeFunc,
  TileContentFunc,
  TileDisabledFunc,
} from "react-calendar/dist/cjs/shared/types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/auth.provider";

dayjs.locale("ja"); // 日本語ロケールを設定

type ScheduledEvents = {
  [key: string]: TeacherCalendarProps["events"];
};

type TeacherCalendarProps = CalendarProps & {
  events: Room[];
};

// カスタムのカレンダーコンポーネント
export const TeacherCalendar = ({ events, ...props }: TeacherCalendarProps) => {
  const theme = useTheme();
  const StyledCalendar = styled(Calendar)`
    width: 100%;
    border: 1px solid #ccc;
    font-family: Arial, sans-serif;
    .react-calendar_title {
      max-width: "100%";
      min-height: "15px";
      padding: "0px";
      back-ground: none;
      text-align: center;
      line-height: 16px;
    }
    .react-calendar__tile--now {
      background: ${theme.palette.primary.main};
      color: white;
    }

    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
      background: ${theme.palette.primary.main};
      color: white;
    }
  `;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  let scheduledEvents: ScheduledEvents = {};
  for (const event of events) {
    // プロパティがなければ、配列をプロパティに追加する
    if (!scheduledEvents[dayjs(event.startAt).format("YYYY-MM-DD")]) {
      scheduledEvents[dayjs(event.startAt).format("YYYY-MM-DD")] = [];
    }
    // プロパティにeventを追加する
    scheduledEvents[dayjs(event.startAt).format("YYYY-MM-DD")].push(event);
  }

  // 選択された日付
  const [selectedDate, setSelectedDate] = useState(null);

  // 日付が選択されたときのハンドラー
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // カレンダータイル（日付）のレンダリングをカスタマイズ
  const tileContent: React.ReactNode | TileContentFunc = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = dayjs(date).format("YYYY-MM-DD");
      let sortedScheduleEvents: Room[] = [];
      if (scheduledEvents[formattedDate]) {
        // その日のeventsを、開始時間でsortして取得する
        sortedScheduleEvents = scheduledEvents[formattedDate].sort(
          (a, b) => a.startAt.getTime() - b.startAt.getTime()
        );
      }

      return (
        <Box
          width="100%"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
        >
          <Typography fontWeight={"bold"}>{date.getDate()}</Typography>
          {Array.isArray(sortedScheduleEvents) &&
            sortedScheduleEvents.length !== 0 &&
            sortedScheduleEvents.map(
              (event) =>
                event.teacher.id === user.teacher.id && (
                  <Box key={event.id} textAlign="left">
                    <Typography variant="caption">
                      {`${dayjs(event.startAt).format("HH:mm")}`}
                    </Typography>
                    <br />
                    <Typography variant="caption">オンライン自習室</Typography>
                  </Box>
                )
            )}
        </Box>
      );
    }
  };

  // オンライン自習室が開催されない日は押せない
  const tileDisabled: TileDisabledFunc = ({ date, view }) => {
    if (view !== "month") {
      return false;
    }
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    return !(
      formattedDate in scheduledEvents &&
      Array.isArray(scheduledEvents[formattedDate]) &&
      scheduledEvents[formattedDate].length > 0
    );
  };

  // ナビゲーションバー（MM月DD日）をカスタマイズ
  const navigationLabel: NavigationLabelFunc = ({ date }) => {
    return (
      <Typography variant="h6">{dayjs(date).format("YYYY年MM月")}</Typography>
    );
  };

  // オンライン自習室が開催される日であれば、その詳細ページへと遷移する
  const onClickDay: OnChangeFunc = (date) => {
    return navigate(
      `/rooms/${scheduledEvents[dayjs(date).format("YYYY-MM-DD")][0].id}`
    );
  };

  return (
    <Box width="100%">
      <StyledCalendar
        locale="ja"
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={null}
        tileContent={tileContent}
        navigationLabel={navigationLabel}
        // 日付はtileContentで描画しているので不要
        formatDay={() => ""}
        tileDisabled={tileDisabled}
        onClickDay={onClickDay}
        {...props}
      />
    </Box>
  );
};
