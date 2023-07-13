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
import { Question } from "../../dto/question.class";
import { JaDateTimeTypography } from "../components/Typography/JaDateTimeTypography";
import { QuestionImagesBox } from "./components/QuestionImagesBox";
import { QuestionAnswerBox } from "./components/QuestionAnswerBox";

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
        <JaDateTimeTypography date={createdAt} />
        <HeadlineTypography>更新日時</HeadlineTypography>
        <JaDateTimeTypography date={updatedAt} />
        <HeadlineTypography>質問タイトル</HeadlineTypography>
        <Typography>{title}</Typography>
        <HeadlineTypography>質問内容</HeadlineTypography>
        <Typography>{content}</Typography>
        <HeadlineTypography>備考</HeadlineTypography>
        <Typography>{memo || "なし"}</Typography>
      </Box>
      <HeadlineTypography>問題画像</HeadlineTypography>
      <QuestionImagesBox images={problems} />

      <HeadlineTypography>解答画像</HeadlineTypography>
      <QuestionImagesBox images={solutions} />

      {answer && (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">回答動画</Typography>
              <Box mt={2} pb="56.25%" position="relative">
                <QuestionAnswerBox answer={answer} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      )}
    </>
  );
};
