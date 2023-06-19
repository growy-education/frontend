import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { QuestionTitle } from "./QuestionTitle";
import SendIcon from "@mui/icons-material/Send";
import { Relationship } from "../types/relationship.enum";
import { TeacherStatus } from "../types/teacher-status.enum";
import { Question } from "../types/question.class";
import { useParams } from "react-router-dom";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { PhotoLibraryOutlined } from "@mui/icons-material";

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

  return (
    <>
      <Typography variant="h4">講師情報を更新する</Typography>
      <QuestionTitle title="ID" />
      <Typography>{question.id}</Typography>

      <QuestionTitle title="質問タイトル" />
      <Typography>{question.title}</Typography>
      <TextField
        fullWidth
        id="title"
        label="タイトル"
        helperText="教材名や問題番号がオススメです。解説動画のタイトルにもなります。"
        onChange={(event) => setTitle(event.target.value)}
      />

      <QuestionTitle title="質問内容" />
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

      <QuestionTitle title="備考" />
      <Typography>{question.memo}</Typography>
      <TextField
        fullWidth
        id="question"
        label="備考"
        multiline
        helperText="動画へのご要望があればお書きください。解説動画を作成するスタッフが確認いたします。"
        onChange={(event) => setMemo(event.target.value)}
      />

      <QuestionTitle title="問題の画像" />
      {question.problems.length > 0 && (
        <Box sx={{ mt: 2, overflowX: "auto" }}>
          <Grid container spacing={2} sx={{ pr: 2 }}>
            {question.problems.map((preview, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <img
                  src={preview}
                  alt={`Image ${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <QuestionTitle title="解答の画像" />
      {question.solutions.length > 0 && (
        <Box sx={{ mt: 2, overflowX: "auto" }}>
          <Grid container spacing={2} sx={{ pr: 2 }}>
            {question.solutions.map((preview, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <img
                  src={preview}
                  alt={`Image ${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Grid>
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
