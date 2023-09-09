import { Box, BoxProps, TextField } from "@mui/material";
import { Question } from "../../dto/question.class";
import { useContext, useRef } from "react";
import { CancelQuestionButton } from "./components/CancelQuestionButton";
import { IsNotEmpty, IsString } from "class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import axios from "axios";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { CancelQuestionTextField } from "./components/TextField/CancelQuestionTextField";

type CancelQuestionFormProps = {
  question: Question;
} & BoxProps;

class CancelQuestionDto {
  @IsNotEmpty({ message: "キャンセル理由を入力してください" })
  @IsString({ message: "キャンセル理由は文字で入力してください" })
  reason: string;
}

export const CancelQuestionForm = ({
  question,
  ...props
}: CancelQuestionFormProps) => {
  const { axiosConfig } = useContext(AxiosContext);

  const sending = useRef(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CancelQuestionDto>({
    resolver: classValidatorResolver(CancelQuestionDto),
    defaultValues: {
      reason: "",
    },
  });

  const handleCancelingQuestion: SubmitHandler<CancelQuestionDto> = async (
    data
  ) => {
    if (sending.current) {
      return;
    }
    sending.current = true;

    // axios
    //   .create(axiosConfig)
    //   .post(`/questions/${question.id}`, { status: QuestionStatus.CANCELED })
    //   .then(() => {})
    //   .catch(() => {})
    //   .finally(() => {sending.current = false});
    console.log("キャンセルした！");
    sending.current = false;
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleCancelingQuestion)}>
      <CancelQuestionTextField
        error={!!errors.reason}
        helperText={
          !!errors.reason
            ? errors.reason.message
            : "質問をキャンセルする理由を入力してください.このメッセージは生徒様に通知されます."
        }
        {...register("reason")}
      />
      <CancelQuestionButton question={question} />
    </Box>
  );
};
