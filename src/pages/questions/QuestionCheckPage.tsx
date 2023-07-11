import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useParams } from "react-router-dom";
import { Question } from "../../types/question.class";
import axios from "axios";
import { Title } from "../../components/QuestionTitle";
import { plainToInstance } from "class-transformer";
import { LockOpen } from "@mui/icons-material";
import { LoadingData } from "../../components/LoadingData";
import { CustomImage } from "../../components/CustomImage";
import { JaDateTime } from "../../components/JaDateTime";

export const QuestionCheck = () => {
  const { questionId } = useParams();
  const { axiosConfig } = useContext(AxiosContext);
  const [question, setQuestion] = useState<null | Question>(null);
  const [open, setOpen] = useState(false);

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
    return <LoadingData message="質問情報を取得中です" />;
  }

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

  const getImagePaths = (urls: string[]) => {
    const ids = urls.map((url) => {
      if (url.includes("https://drive.google.com/open?id=")) {
        const id = url.split("https://drive.google.com/open?id=")[1];
        if (id) {
          return `http://localhost:8080/google/images/${id}`;
        }
      }
    });
    const filteredIds = ids.filter((id) => !!id);
    return filteredIds;
  };

  const getYouTubePath = (url: string) => {
    if (url.includes("https://youtu.be/")) {
      const id = url.split("https://youtu.be/")[1];
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    }
  };

  const checkQuestion = () => {};

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
        margin={1}
      >
        <Button
          variant="contained"
          endIcon={<LockOpen />}
          onClick={() => checkQuestion()}
        >
          動画のチェックを完了する
        </Button>
      </Box>
      <Box my={3}>
        <Title title="ID" />
        <Typography>{id}</Typography>
        <Title title="作成日時" />
        <JaDateTime date={createdAt} />
        <Title title="更新日時" />
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
        <CustomImage id={image.id} key={`problems-${index}`} />
      ))}
      <Title title="解答画像" />
      {solutions.map((image, index) => (
        <CustomImage id={image.id} key={`solution-${index}`} />
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
    </Container>
  );
};
