import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { Question } from "../../types/question.class";
import { useCallback } from "react";
import { RotatableImage } from "../images/RotatableImage";
import { JaDateTime } from "../JaDateTime";

type QuestionDetailProps = {
  question: Question;
};
export const QuestionDetail = ({ question, ...props }: QuestionDetailProps) => {
  const theme = useTheme();
  const {
    id,
    createdAt,
    updatedAt,
    title,
    content,
    memo,
    problems,
    solutions,
    answer,
  } = question;

  const getYouTubePath = useCallback((url: string) => {
    if (url.includes("https://youtu.be/")) {
      const id = url.split("https://youtu.be/")[1];
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }
  }, []);

  return (
    <>
      <Box my={3}>
        <HeadlineTypography>回答状況</HeadlineTypography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography>講師を選出しています</Typography>
          <CircularProgress
            size={24}
            style={{ marginLeft: theme.spacing(1) }}
          />
        </Box>
        <HeadlineTypography>質問ID</HeadlineTypography>
        <Typography>{id}</Typography>
        <HeadlineTypography>作成日時</HeadlineTypography>
        <JaDateTime date={createdAt} />
        <HeadlineTypography>更新日時</HeadlineTypography>
        <JaDateTime date={updatedAt} />
        <HeadlineTypography>質問タイトル</HeadlineTypography>
        <Typography>{title}</Typography>
        <HeadlineTypography>質問内容</HeadlineTypography>
        <Typography>{content}</Typography>
        <HeadlineTypography>備考</HeadlineTypography>
        <Typography>{memo || "なし"}</Typography>
      </Box>
      <HeadlineTypography>問題画像</HeadlineTypography>
      {problems.map((image, index) => (
        <RotatableImage id={image.id} key={`problem-${index}`} />
      ))}
      <HeadlineTypography>解答画像</HeadlineTypography>
      {solutions.map((image, index) => (
        <RotatableImage id={image.id} key={`solution-${index}`} />
      ))}
      {answer && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">回答動画</Typography>
              <Box mt={2} pb="56.25%" position="relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubePath(answer)}
                  title="回答動画"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0 }}
                ></iframe>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};
