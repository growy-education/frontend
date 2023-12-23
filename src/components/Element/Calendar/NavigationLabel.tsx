import { Typography } from "@mui/material";
import dayjs from "dayjs";

type NavigationLabelProps = {
  date: Date;
};
/**
 * ナビゲーションバー（MM月DD日）をカスタマイズ
 */
export const NavigationLabel = ({ date }: NavigationLabelProps) => {
  return (
    <Typography variant="h6">{dayjs(date).format("YYYY年MM月")}</Typography>
  );
};
