import { Typography, TypographyProps } from "@mui/material";
import dayjs from "dayjs";

type JaDateProps = TypographyProps & {
  date: Date;
};

export const JaDateTypography = ({ date, ...props }: JaDateProps) => {
  return <Typography {...props}>{dayjs(date).format("YYYY/MM/DD")}</Typography>;
};
