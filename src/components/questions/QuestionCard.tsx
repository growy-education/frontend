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
import { Question } from "../../dto/question.class";
import { QuestionStatusBox } from "./components/QuestionStatusBox";
import { JaDateTimeTypography } from "../../components/components/Typography/JaDateTimeTypography";

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
              justifyContent: "space-between",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="left"
            >
              {question.title}
            </Typography>
            <QuestionStatusBox status={question.status} />
          </Box>

          <Typography variant="body2" color="text.secondary" textAlign="left">
            {question.content}
          </Typography>
          <JaDateTimeTypography
            variant="body2"
            color="text.secondary"
            textAlign="right"
          />
        </CardContent>
        <QuestionCardMedia id={question.problems[0].id} />
      </CardActionArea>
    </Card>
  );
};
