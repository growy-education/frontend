import { Box } from "@mui/material";
import { AnswerRating } from "./AnswerRating";
import { Task } from "../../tasks/types/task.class";
import { Question } from "../types/question.class";
import { AnswerComment } from "./AnswerComment";
import { ReportAnswerIconButton } from "./ReportAnswerIconButton";

type AnswerRatingProps = {
  question: Question;
  task: Task;
};

export const AnswerHeader = ({ question, task }: AnswerRatingProps) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AnswerRating question={question} task={task} />
        <ReportAnswerIconButton question={question} task={task} />
      </Box>
      <AnswerComment question={question} task={task} />
    </Box>
  );
};
