import { Box, BoxProps, Button } from "@mui/material";
import { Send } from "@mui/icons-material";

import { Task } from "../tasks/types/task.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { AnswerQuestionTaskDto } from "./types/answer-question-task.dto";

import { QuestionAnswerTextField } from "./components/TextField/QuestionAnswerTextField";
import { QuestionAnswerBox } from "./components/QuestionAnswerBox";
import { QuestionAnswerCheckBox } from "./components/answer/QuestionAnswerCheckBox";
import { getYouTubeIdFromUrl } from "../../tools/get-youtube-id-from-url";
import { useAnswerQuestionTask } from "../tasks/api/answerTask";
import { Question } from "./types/question.class";

type AnswerQuestionTaskFormProps = {
  question: Question;
  task: Task;
} & BoxProps<"form">;

export const AnswerTaskQuestionForm = ({
  question,
  task,
  ...props
}: AnswerQuestionTaskFormProps) => {
  const mutation = useAnswerQuestionTask();

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    watch,
  } = useForm<AnswerQuestionTaskDto>({
    resolver: classValidatorResolver(AnswerQuestionTaskDto),
    defaultValues: {
      answer: task?.answer || "",
    },
  });

  const handleAnswerQuestionTask: SubmitHandler<AnswerQuestionTaskDto> = async (
    data
  ) => {
    if (mutation.isPending) {
      return;
    }

    mutation.mutate({ questionId: question.id, taskId: task.id, dto: data });
  };
  watch("answer");

  return (
    <Box
      m={2}
      component="form"
      onSubmit={handleSubmit(handleAnswerQuestionTask)}
      {...props}
    >
      <QuestionAnswerTextField
        error={!!errors.answer}
        helperText={
          !!errors.answer
            ? errors.answer.message
            : "作成したYouTubeのURL(e.g.https://youtu.be/***）を入力してください"
        }
        {...register("answer")}
      />
      {!!!errors.answer && (
        <>
          <QuestionAnswerBox answer={getValues("answer")} />
          <QuestionAnswerCheckBox />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<Send />}
            disabled={
              mutation.isPending ||
              !!errors.answer ||
              task.answer === getYouTubeIdFromUrl(getValues("answer"))
            }
          >
            回答する
          </Button>
        </>
      )}
    </Box>
  );
};
