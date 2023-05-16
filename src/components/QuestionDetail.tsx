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

const QuestionDetail = () => {
  const [question, setQuestion] = useState<null | Question>(null);
  const { axiosConfig } = useContext(AxiosContext);

  const { questionId } = useParams();
  useEffect(() => {
    console.log("きたquestion id:", questionId);
    axios
      .create(axiosConfig)
      .get(`/questions/${questionId}`)
      .then((response) => {
        setQuestion(JSON.parse(response.data));
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

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <Typography variant="h6">{createdAt.toDateString()}</Typography>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{content}</Typography>
        <Typography variant="body1">{memo}</Typography>
      </Box>
      <Grid container spacing={2}>
        {problems.map((image, index) => (
          <Grid item xs={6} key={`question-image-${id}-${index}`}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={`Question Image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
        {solutions.map((image, index) => (
          <Grid item xs={6} key={`answer-image-${id}-${index}`}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={image}
                alt={`Answer Image ${index + 1}`}
              />
            </Card>
          </Grid>
        ))}
        {answers &&
          answers.map((answer) => (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Answer YouTube Video</Typography>
                  <Box mt={2} pb="56.25%" position="relative">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${answer}`}
                      title="Answer YouTube Video"
                      frameBorder="0"
                      allowFullScreen
                      style={{ position: "absolute", top: 0, left: 0 }}
                    ></iframe>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default QuestionDetail;
