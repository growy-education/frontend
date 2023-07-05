import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Title } from "../QuestionTitle";
import { Question } from "../../types/question.class";
import { useCallback } from "react";
import { RotatableImage } from "../RotatableImage";
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
        <Title title="回答状況" />
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography>講師を選出しています</Typography>
          <CircularProgress
            size={24}
            style={{ marginLeft: theme.spacing(1) }}
          />
        </Box>
        <Title title="ID" />
        <Typography>{id}</Typography>
        <Title title="作成日時" />
        <JaDateTime date={createdAt} />
        <Title title="作成日時" />
        <JaDateTime date={updatedAt} />
        <Title title="タイトル" />
        <Typography>{title}</Typography>
        <Title title="質問内容" />
        <Typography>{content}</Typography>
        <Title title="備考" />
        <Typography>{memo || "なし"}</Typography>
      </Box>
      <Title title="問題画像" />
      {problems.map((image, index) => (
        <RotatableImage id={image.id} key={`problem-${index}`} />
      ))}
      <Title title="解答画像" />
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
