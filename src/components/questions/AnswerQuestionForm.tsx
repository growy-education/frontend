import { Box, BoxProps, Button } from "@mui/material";

import { IsNotEmpty } from "class-validator";
import { useContext, useRef } from "react";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";

import { Question } from "../../dto/question.class";
import { IsYouTubeUrl } from "../../tools/is-youtube-url.decorator";
import { QuestionAnswerTextField } from "./components/TextField/QuestionAnswerTextField";
import { QuestionAnswerBox } from "./components/QuestionAnswerBox";
import { Send } from "@mui/icons-material";
import { QuestionAnswerCheckBox } from "./QuestionAnswerCheckBox";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { getYoutubeUrl } from "../../tools/get-youtube-url";

type AnswerQuestionFormProps = {
  question: Question;
} & BoxProps<"form">;

class AnswerQuestionDto {
  @IsNotEmpty({ message: "URLを入力してください" })
  @IsYouTubeUrl({
    message:
      "有効なYouTubeの(https://www.youtube.com/watch?v=***）を入力してください",
  })
  answer: string;
}

export const AnswerQuestionForm = ({
  question,
  ...props
}: AnswerQuestionFormProps) => {
  const { answerQuestionById } = useContext(QuestionContext);

  const sending = useRef(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    setError,
    watch,
  } = useForm<AnswerQuestionDto>({
    resolver: classValidatorResolver(AnswerQuestionDto),
    defaultValues: {
      answer: question?.answer || "",
    },
  });

  watch("answer");

  const handleAnswerQuestion: SubmitHandler<AnswerQuestionDto> = async (
    data
  ) => {
    if (sending.current) {
      return;
    }

    const answer = getYoutubeUrl(data.answer);

    if (!!!answer) {
      return setError("answer", { message: "適切なURLではありません。" });
    }

    sending.current = true;
    answerQuestionById(question.id, answer).finally(() => {
      sending.current = false;
    });
  };

  return (
    <Box
      m={2}
      component="form"
      onSubmit={handleSubmit(handleAnswerQuestion)}
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
              sending.current || question?.answer === getValues("answer")
            }
          >
            回答する
          </Button>
        </>
      )}
    </Box>
  );
};
