import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { QuestionCardMedia } from "./QuestionCardMedia";
import { Question } from "./types/question.class";
import { QuestionStatusBox } from "./components/QuestionStatusBox";
import { JaDateTimeTypography } from "../../components/Element/Typography/JaDateTimeTypography";

type QuestionCardProps = {
  question: Question;
} & CardProps;

export const QuestionCard = ({
  question,
  children,
  ...props
}: QuestionCardProps) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/questions/${question.id}`)} {...props}>
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="left"
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {question.title}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginBottom: 1,
            }}
          >
            <QuestionStatusBox status={question.status} />
          </Box>

          <Typography variant="body2" color="text.secondary" textAlign="left">
            {question.content}
          </Typography>
          <JaDateTimeTypography
            variant="body2"
            color="text.secondary"
            textAlign="right"
            date={question.createdAt}
          />
        </CardContent>
        <Box
          sx={{
            width: "100%",
            height: "200px", // コンテナの高さ
            overflow: "hidden",
          }}
        >
          <QuestionCardMedia id={question?.problems[0]?.id} />
        </Box>
      </CardActionArea>
    </Card>
  );
};
