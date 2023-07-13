import { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import SendIcon from "@mui/icons-material/Send";
import { Question } from "../../dto/question.class";
import { useParams } from "react-router-dom";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { PhotoLibraryOutlined } from "@mui/icons-material";
import { LoadingBox } from "../../components/LoadingData";
import { CustomImage } from "../../components/images/CustomImage";

export const QuestionEdit = () => {
  const { questionId } = useParams();
  const { axiosConfig } = useContext(AxiosContext);
  const [question, setQuestion] = useState<Question | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memo, setMemo] = useState("");
  const [problems, setProblems] = useState<File[]>([]);
  const [solutions, setSolutions] = useState<File[]>([]);

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get(`/questions/${questionId}`)
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        setQuestion(question);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, questionId]);

  if (!!!question) {
    return <LoadingBox message="質問情報を取得中です" />;
  }

  return (
    <>
      <Typography variant="h4">質問情報を更新する</Typography>
      <HeadlineTypography>質問ID</HeadlineTypography>
      <Typography>{question.id}</Typography>

      <HeadlineTypography>質問タイトル</HeadlineTypography>
      <Typography>{question.title}</Typography>
      <TextField
        fullWidth
        id="title"
        label="タイトル"
        helperText="教材名や問題番号がオススメです。解説動画のタイトルにもなります。"
        onChange={(event) => setTitle(event.target.value)}
      />

      <HeadlineTypography>質問内容</HeadlineTypography>
      <Typography>{question.content}</Typography>
      <TextField
        fullWidth
        multiline
        rows={3}
        id="content"
        label="内容"
        helperText="解説の分からないポイントをお書きください。もちろん質問する画像に書き込んでも良いです。"
        onChange={(event) => setContent(event.target.value)}
      />

      <HeadlineTypography>備考</HeadlineTypography>
      <Typography>{question.memo}</Typography>
      <TextField
        fullWidth
        id="question"
        label="備考"
        multiline
        helperText="動画へのご要望があればお書きください。解説動画を作成するスタッフが確認いたします。"
        onChange={(event) => setMemo(event.target.value)}
      />

      <HeadlineTypography>問題の画像</HeadlineTypography>
      {question.problems.length > 0 && (
        <Box sx={{ mt: 2, overflowX: "auto" }}>
          <Grid container spacing={2} sx={{ pr: 2 }}>
            {question.problems.map((image, index) => (
              <CustomImage id={image.id} key={`solution-${index}`} />
            ))}
          </Grid>
        </Box>
      )}

      <HeadlineTypography>解答の画像</HeadlineTypography>
      {question.solutions.length > 0 && (
        <Box sx={{ mt: 2, overflowX: "auto" }}>
          <Grid container spacing={2} sx={{ pr: 2 }}>
            {question.solutions.map((image, index) => (
              <CustomImage id={image.id} key={`solution-${index}`} />
            ))}
          </Grid>
        </Box>
      )}
      <label htmlFor="solution-image-input">
        <Button
          variant="contained"
          component="span"
          sx={{ mt: 2 }}
          endIcon={<PhotoLibraryOutlined />}
        >
          解答の画像を選択する
        </Button>
      </label>

      <Box margin="0.5em">
        <Button
          color="primary"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => console.log("更新しちゃうよ")}
        >
          更新する
        </Button>
      </Box>
    </>
  );
};
