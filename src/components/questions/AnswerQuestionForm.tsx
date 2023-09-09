import { Box, BoxProps, Button } from "@mui/material";

import { IsNotEmpty } from "class-validator";
import { useContext, useRef } from "react";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";

import { Question } from "../../dto/question.class";
import { IsYouTubeUrl } from "../../tools/is-youtube-url.decorator";
import { QuestionAnswerTextField } from "./components/TextField/QuestionAnswerTextField";
import { QuestionAnswerBox } from "./components/QuestionAnswerBox";
import axios from "axios";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { plainToInstance } from "class-transformer";
import { Send } from "@mui/icons-material";
import { QuestionAnswerCheckBox } from "./QuestionAnswerCheckBox";
import { QuestionContext } from "../../contexts/QuestionContextProvider";

type AnswerQuestionFormProps = {
  question: Question;
} & BoxProps<"form">;

class AnswerQuestionDto {
  @IsNotEmpty({ message: "URLを入力してください" })
  @IsYouTubeUrl({
    message: "有効なYouTubeの(e.g.https://youtu.be/***）ではありません",
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
    sending.current = true;
    answerQuestionById(question.id, data.answer).finally(() => {
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
