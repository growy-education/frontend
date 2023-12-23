import { Box, Typography } from "@mui/material";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { useLessons } from "../../features/lessons/api/getLessons";
import { LessonCard } from "../../features/lessons/components/LessonCard";

type LessonsListPageProps = {};

export const LessonsListPage = (props: LessonsListPageProps) => {
  const { isLoading, isError, data: lessons } = useLessons();

  if (isLoading) {
    return <LoadingBox message="授業を取得しています" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="ネットワークエラー"
        description="授業データの取得に失敗しました。ネットワーク環境を確認してください。"
      />
    );
  }

  return (
    <Box my={3}>
      <PageTitleTypography>今日の授業</PageTitleTypography>
      <Typography color="error">現在、こちらのページを準備中です🙇‍♂️</Typography>
      {(!Array.isArray(lessons) || lessons.length === 0) && (
        <Typography>登録されている授業がありません</Typography>
      )}
      {lessons && (
        <Box m={2}>
          {lessons
            .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())
            .map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
        </Box>
      )}
    </Box>
  );
};
