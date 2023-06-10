import { useContext, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { Box, Grid, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { QuestionTitle } from "./QuestionTitle";
import { PhotoLibraryOutlined } from "@mui/icons-material";
import axios from "axios";

export const QuestionNew = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memo, setMemo] = useState("");
  const [problems, setProblems] = useState<File[]>([]);
  const [problemPreviews, setProblemPreviews] = useState<string[]>([]);
  const [solutions, setSolutions] = useState<File[]>([]);
  const [solutionPreviews, setSolutionPreviews] = useState<string[]>([]);

  const { axiosConfig } = useContext(AxiosContext);

  const handleProblemImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setProblems(filesArray);

      // 画像のプレビューを作成
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setProblemPreviews(previews);
    }
  };

  const handleSolutionImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSolutions(filesArray);

      // 画像のプレビューを作成
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setSolutionPreviews(previews);
    }
  };

  const handleImageUpload = async () => {
    console.log(problems);
    console.log(solutions);

    const problemIds = await Promise.all(
      problems.map(async (problem) => {
        const formData = new FormData();
        formData.append("file", problem);
        return axios
          .create(axiosConfig)
          .post("google/upload", formData, {
            headers: {
              //Content-Type is needed for interceptor of backend
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            return response.data.id as unknown as string;
          })
          .catch((error) => console.log(error));
      })
    );
    console.log(problemIds);

    const solutionIds = await Promise.all(
      solutions.map(async (solution) => {
        const formData = new FormData();
        formData.append("file", solution);
        return axios
          .create(axiosConfig)
          .post("google/upload", formData, {
            headers: {
              //Content-Type is needed for interceptor of backend
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log(response.data);
            return response.data.id as unknown as string;
          })
          .catch((error) => console.log(error));
      })
    );
    console.log(solutionIds);

    axios
      .create(axiosConfig)
      .post("questions", {
        title,
        content,
        memo,
        problems: problemIds,
        solutions: solutionIds,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Typography variant="h4">質問入力画面</Typography>
      <QuestionTitle title="質問タイトル" />
      <TextField
        fullWidth
        id="title"
        label="タイトル"
        helperText="教材名や問題番号がオススメです。解説動画のタイトルにもなります。"
        onChange={(event) => setTitle(event.target.value)}
      />

      <QuestionTitle title="質問内容" />
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
      <TextField
        fullWidth
        id="question"
        label="備考"
        multiline
        helperText="動画へのご要望があればお書きください。解説動画を作成するスタッフが確認いたします。"
        onChange={(event) => setMemo(event.target.value)}
      />

      <QuestionTitle title="問題の画像" />
      {problemPreviews.length > 0 && (
        <Box sx={{ mt: 2, overflowX: "auto" }}>
          <Grid container spacing={2} sx={{ pr: 2 }}>
            {problemPreviews.map((preview, index) => (
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
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleProblemImageSelect}
        style={{ display: "none" }}
        id="problem-image-input"
      />
      <label htmlFor="problem-image-input">
        <Button
          variant="contained"
          component="span"
          sx={{ mt: 2 }}
          endIcon={<PhotoLibraryOutlined />}
        >
          問題の画像を選択する
        </Button>
      </label>

      <QuestionTitle title="解答の画像" />
      {solutionPreviews.length > 0 && (
        <Box sx={{ mt: 2, overflowX: "auto" }}>
          <Grid container spacing={2} sx={{ pr: 2 }}>
            {solutionPreviews.map((preview, index) => (
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
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleSolutionImageSelect}
        style={{ display: "none" }}
        id="solution-image-input"
      />
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
          onClick={handleImageUpload}
        >
          送信
        </Button>
      </Box>
    </>
  );
};
