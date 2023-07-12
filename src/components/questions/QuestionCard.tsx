import {
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { QuestionCardMedia } from "./QuestionCardMedia";
import { Question } from "../../types/question.class";

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
    <Card {...props} onClick={() => navigate(`/questions/${question.id}`)}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {question.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {question.content}
          </Typography>
        </CardContent>
        <QuestionCardMedia id={question.problems[0].id} />
      </CardActionArea>
    </Card>
  );
};
