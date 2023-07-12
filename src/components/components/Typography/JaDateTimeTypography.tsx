import { Typography, TypographyProps } from "@mui/material";
import dayjs from "dayjs";

type JaDateTimeProps = TypographyProps & {
  date: Date;
};
export const JaDateTimeTypography = ({ date, ...props }: JaDateTimeProps) => {
  return (
    <Typography {...props}>{dayjs(date).format("YYYY/MM/DD HH:mm")}</Typography>
  );
};
