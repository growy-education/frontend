import { alpha, useTheme } from "@mui/material";
import styled from "@emotion/styled";
import Calendar, { CalendarProps } from "react-calendar";
import { NavigationLabel } from "./NavigationLabel";

// ReactCalendar用
import dayjs from "dayjs";
import "dayjs/locale/ja";

type StyledCalendarProps = Omit<CalendarProps, "locale" | "navigationLabel">;

dayjs.locale("ja"); // 日本語ロケールを設定

export const StyledCalendar = (props: StyledCalendarProps) => {
  const theme = useTheme();

  const StyledCalendar = styled(Calendar)`
    width: 100% !important;
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

    .react-calendar__month-view__days__day--weekend {
      color: black;
    }

    .react-calendar__tile--now {
      background: ${alpha(theme.palette.primary.main, 0.8)};
      color: white;
    }

    .react-calendar__tile--now span {
      color: white !important;
    }

    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
      background: ${theme.palette.primary.main};
      color: white;
    }
  `;

  return (
    <StyledCalendar
      locale="ja"
      navigationLabel={({ date }) => <NavigationLabel date={date} />}
      {...props}
    />
  );
};
