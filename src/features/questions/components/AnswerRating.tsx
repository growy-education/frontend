import { Box, Rating, RatingProps, Tooltip, Typography } from "@mui/material";
import { Question } from "../types/question.class";
import { useSendRatingToAnswer } from "../api/sendRatingToAnswer";
import { Task } from "../../tasks/types/task.class";

type AnswerRatingProps = {
  question: Question;
  task: Task;
};

export const AnswerRating = ({ question, task }: AnswerRatingProps) => {
  const mutation = useSendRatingToAnswer();

  const handleRatingChange: RatingProps["onChange"] = (_event, value) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({
      questionId: question.id,
      answer: task.answer,
      dto: { rating: value },
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography textAlign="left" mr={1}>
        動画の評価：
      </Typography>
      <Tooltip title="動画を評価してみませんか？" placement="top">
        <Rating
          name="answer-rating"
          value={task.rating}
          onChange={handleRatingChange}
        />
      </Tooltip>
    </Box>
  );
};
