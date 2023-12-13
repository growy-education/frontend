import { useState } from "react";
import { MenuItem, MenuItemProps, TextField, Typography } from "@mui/material";
import { Feedback } from "@mui/icons-material";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { Question } from "../../../types/question.class";
import { ReportQuestionDto } from "../../../types/report-question.dto";
import { ConfirmationDialog } from "../../../../../components/Element/Dialog/ConfirmationDialog";
import { useReportQuestion } from "../../../api/reportQuestion";

type ReportQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const ReportQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: ReportQuestionMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useReportQuestion({
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
  } = useForm<ReportQuestionDto>({
    resolver: classValidatorResolver(ReportQuestionDto),
    defaultValues: {
      reportMessage: "",
    },
  });

  const handleCancel = () => {
    setOpen(false);
    reset();
    if (onClick) {
      onClick(null);
    }
  };
  const handleClick = () => setOpen(true);

  const onSubmit: SubmitHandler<ReportQuestionDto> = (
    data: ReportQuestionDto
  ) => {
    mutation.mutate({ questionId: question.id, dto: data });
  };

  const handleConfirm = async () => {
    if (mutation.isPending) {
      return;
    }
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        color="primary.main"
        {...props}
      >
        <Feedback color="error" />
        <Typography color="error" ml={1}>
          質問を報告する
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        open={open}
        labelName="report-question"
        title="質問を運営に報告する"
        content={
          (
            <TextField
              id="report-message"
              required
              fullWidth
              autoFocus
              multiline
              margin="dense"
              error={!!errors.reportMessage}
              helperText={
                !!errors.reportMessage
                  ? errors.reportMessage.message
                  : "例)解答の画像として(1)が足りないので、追加して下さい。よろしくお願いします"
              }
              {...register("reportMessage")}
            />
          ) as any
        }
        contentText="質問を報告する理由を入力してください。このメッセージは運営に送信されます。"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
