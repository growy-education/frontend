import { IconButton, TextField, Tooltip } from "@mui/material";
import { Task } from "../../tasks/types/task.class";
import { Question } from "../types/question.class";
import { ReportProblem } from "@mui/icons-material";
import { ConfirmationDialog } from "../../../components/Element/Dialog/ConfirmationDialog";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { ReportAnswerDto } from "../types/report-answer.dto";
import { useReportAnswer } from "../api/useReportAnswer";

type ReportAnswerIconButtonProps = {
  question: Question;
  task: Task;
};

export const ReportAnswerIconButton = ({
  question,
  task,
}: ReportAnswerIconButtonProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useReportAnswer({
    options: {
      onSettled: () => {
        handleCancel();
      },
    },
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ReportAnswerDto>({
    resolver: classValidatorResolver(ReportAnswerDto),
    defaultValues: {
      message: "",
    },
  });

  const handleCancel = () => {
    setOpen(false);
    reset();
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.style.pointerEvents = "auto";
    });
  };
  const handleClick = () => {
    setOpen(true);
    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.style.pointerEvents = "none";
    });
  };

  const onSubmit: SubmitHandler<ReportAnswerDto> = async (data) => {
    mutation.mutate({
      questionId: question.id,
      answer: task.answer,
      dto: data,
    });
  };

  const handleConfirm = async () => {
    if (mutation.isPending) {
      return;
    }
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <Tooltip title="動画の問題を報告" placement="left">
        <IconButton onClick={handleClick}>
          <ReportProblem color="error" />
        </IconButton>
      </Tooltip>
      <ConfirmationDialog
        open={open}
        labelName="report-question"
        title="動画を運営に報告する"
        content={
          (
            <TextField
              id="report-message"
              required
              fullWidth
              autoFocus
              multiline
              margin="dense"
              error={!!errors.message}
              helperText={
                !!errors.message
                  ? errors.message.message
                  : "例)解説動画の音が途中で切れています。2:15のところです。"
              }
              {...register("message")}
            />
          ) as any
        }
        contentText="動画を報告する理由を入力してください。このメッセージは運営に送信されます。"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
