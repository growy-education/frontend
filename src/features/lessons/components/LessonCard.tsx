import { Card, CardProps, Typography } from "@mui/material";
import { HeaderBox } from "../../../components/Layout/HeaderBox";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { Lesson } from "../types/lesson.class";
import { JaDateTimeTypography } from "../../../components/Element/Typography/JaDateTimeTypography";
import { LessonStatus } from "../types/lesson-status.enum";
import { ConfirmLessonButton } from "./ConfirmLessonButton";
import { RolesGuard } from "../../../tools/RolesGuard";
import { Role } from "../../users/types/role.enum";

type LessonCardProps = {
  lesson: Lesson;
} & CardProps;

export const LessonCard = ({ lesson }: LessonCardProps) => {
  const { title, status, startAt } = lesson;
  return (
    <Card sx={{ m: 2 }}>
      <RolesGuard roles={[Role.TEACHER]}>
        <HeaderBox>
          <ConfirmLessonButton lesson={lesson} />
        </HeaderBox>
      </RolesGuard>
      <HeadlineTypography>授業タイトル</HeadlineTypography>
      <Typography>{title}</Typography>
      <HeadlineTypography>開始時刻</HeadlineTypography>
      <JaDateTimeTypography date={startAt} />
      <HeadlineTypography>ステータス</HeadlineTypography>
      <Typography>
        {status === LessonStatus.PENDING
          ? "確認を待機中"
          : status === LessonStatus.CONFIRMED
          ? "確認済み"
          : "完了済み"}
      </Typography>
    </Card>
  );
};
