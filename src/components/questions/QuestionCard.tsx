import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Check from "@mui/icons-material/Check";

import { QuestionCardMedia } from "./QuestionCardMedia";
import { Question } from "../../dto/question.class";

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
              予習シリーズ 算数 p43 ⑥
            </Typography>
            <Box display="flex" flexDirection="row">
              <Typography sx={{ color: "success" }}>回答済み</Typography>
              <Check color="success" />
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" textAlign="left">
            つるかめ算の面積図がよく分かりません。
            特に、最後の計算で面積が同じという話がよく分かりませんでした
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="right">
            2023年7月13日 17:22
          </Typography>
        </CardContent>
        <QuestionCardMedia id={question.problems[0].id} />
      </CardActionArea>
    </Card>
  );
};
