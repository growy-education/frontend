import { Box, Button, Card, Typography } from "@mui/material";
import { HeadlineTypography } from "../components/components/Typography/HeadlineTypography";
import { Lesson } from "../dto/lesson.class";
import { JaDateTimeTypography } from "../components/components/Typography/JaDateTimeTypography";
import { LessonStatus } from "../dto/lesson-status.enum";
import { useContext, useEffect, useState } from "react";
import { AxiosContext } from "../contexts/AxiosContextProvider";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { PageTitleTypography } from "../components/components/Typography/PageTitleTypography";
import { AssignmentTurnedIn } from "@mui/icons-material";

type LessonsListPageProps = {};

export const LessonsListPage = (props: LessonsListPageProps) => {
  const { axiosConfig } = useContext(AxiosContext);
  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("/lessons")
      .then((response) => {
        if (!Array.isArray(response.data)) {
          return;
        }
        const lessons = response.data.map((lessonJson: string) =>
          plainToInstance(Lesson, lessonJson)
        );
        setLessons(lessons);
      });
  }, [axiosConfig]);

  const handleClick = async () => {
    const newLessons = await Promise.all(
      lessons
        .filter((lesson) => lesson.status === LessonStatus.PENDING)
        .map(async (lesson) => {
          return axios
            .create(axiosConfig)
            .post(`/lessons/${lesson.id}/confirm`)
            .then((response) => {
              const lesson = plainToInstance(Lesson, response.data);
              return lesson;
            });
        })
    );
    setLessons(newLessons);
  };

  return (
    <Box my={3}>
      <PageTitleTypography>本日の授業</PageTitleTypography>
      {!!!lessons && <Typography>登録されている授業がありません</Typography>}
      {lessons && (
        <Box m={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
            {...props}
          >
            <Button
              id="confirm-lessons-button"
              variant="contained"
              disableElevation
              endIcon={<AssignmentTurnedIn />}
              onClick={handleClick}
              disabled={lessons?.every(
                (lesson) => lesson.status !== LessonStatus.PENDING
              )}
              {...props}
            >
              {lessons?.every(
                (lesson) => lesson.status !== LessonStatus.PENDING
              )
                ? "全て確認済み"
                : "授業を全て確認する"}
            </Button>
          </Box>
          {lessons
            .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())
            .map((lesson) => {
              const { title, startAt, status } = lesson;
              return (
                <Card sx={{ m: 2 }}>
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
            })}
        </Box>
      )}
    </Box>
  );
};
