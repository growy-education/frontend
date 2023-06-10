import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { useParams } from "react-router-dom";
import { Question } from "../types/question.type";
import axios from "axios";
import { QuestionTitle } from "./QuestionTitle";

const QuestionDetail = () => {
  const [question, setQuestion] = useState<null | Question>(null);
  const { axiosConfig } = useContext(AxiosContext);

  const { questionId } = useParams();
  console.log(question);
  useEffect(() => {
    console.log("きたquestion id:", questionId);
    axios
      .create(axiosConfig)
      .get(`/questions/${questionId}`)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [questionId]);

  if (!questionId) {
    return <p>だめだこりゃ！</p>;
  }

  if (!!!question) {
    return <p>ローディングなう！</p>;
  }

  const { id, createdAt, title, content, memo, problems, solutions, answers } =
    question;

  const getImagePaths = (drivePaths: string) => {
    const urls = drivePaths.split(", ");
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

  const getYouTubePaths = (youtubePaths: string) => {
    const urls = youtubePaths.split(", ");
    const ids = urls.map((url) => {
      if (url.includes("https://youtu.be/")) {
        const id = url.split("https://youtu.be/")[1];
        if (id) {
          // This embed phrase is needed for embedding
          return `https://www.youtube.com/embed/${id}`;
        }
      }
    });
    const filteredIds = ids.filter((id) => !!!!id);
    return filteredIds;
  };

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <QuestionTitle title="ID" />
        <Typography>{id}</Typography>
        <QuestionTitle title="日時" />
        <Typography>{createdAt}</Typography>
        <QuestionTitle title="タイトル" />
        <Typography>{title}</Typography>
        <QuestionTitle title="質問内容" />
        <Typography>{content}</Typography>
        <QuestionTitle title="備考" />
        <Typography>{memo || "なし"}</Typography>
      </Box>
      <QuestionTitle title="問題画像" />
      {getImagePaths(problems).map((image, index) => (
        <Grid item xs={12} key={`question-image-${id}`}>
          <Card>
            <CardMedia
              component="img"
              height="100%"
              image={image}
              alt={`Solution Image ${index + 1}`}
            />
          </Card>
        </Grid>
      ))}
      <QuestionTitle title="解答画像" />
      {getImagePaths(solutions).map((image, index) => (
        <Grid item xs={12} key={`answer-image-${id}`}>
          <Card>
            <CardMedia
              component="img"
              height="100%"
              image={image}
              alt={`Answer Image ${index + 1}`}
            />
          </Card>
        </Grid>
      ))}
      {answers &&
        getYouTubePaths(answers).map((url, index) => (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">回答動画</Typography>
                <Box mt={2} pb="56.25%" position="relative">
                  <iframe
                    width="100%"
                    height="100%"
                    src={url}
                    title="Answer YouTube Video"
                    allowFullScreen
                    style={{ position: "absolute", top: 0, left: 0 }}
                  ></iframe>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Container>
  );
};

export default QuestionDetail;
