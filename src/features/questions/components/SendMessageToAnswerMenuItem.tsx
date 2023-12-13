import { useState } from "react";
import { MenuItem, MenuItemProps, TextField, Typography } from "@mui/material";
import { Message } from "@mui/icons-material";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";
import { useSendRatingToAnswer } from "../api/sendRatingToAnswer";
import { ConfirmationDialog } from "../../../components/Element/Dialog/ConfirmationDialog";
import { Question } from "../types/question.class";
import { QuestionAnswerRatingDto } from "../types/answer-rating.dto";

type SendMessageToAnswerMenuItemProps = {
  question: Question;
  answer: string;
} & MenuItemProps;

export const SendMessageToAnswerMenuItem = ({
  question,
  answer,
  onClick,
  ...props
}: SendMessageToAnswerMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useSendRatingToAnswer({
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
  } = useForm<QuestionAnswerRatingDto>({
    resolver: classValidatorResolver(QuestionAnswerRatingDto),
    defaultValues: {
      comment: "",
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

  const onSubmit = (data: QuestionAnswerRatingDto) => {
    mutation.mutate({ questionId: question.id, answer, dto: data });
  };

  const handleConfirm = async () => {
    if (mutation.isPending) {
      return;
    }
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <MenuItem onClick={handleClick} disableRipple color="primary.main">
        <Message color="primary" />
        <Typography color="primary" ml={1}>
          コメントする
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        open={open}
        labelName="send-comment-to-answer"
        title="動画にコメントする"
        content={
          (
            <TextField
              id="report-comment"
              required
              fullWidth
              autoFocus
              multiline
              margin="dense"
              error={!!errors.comment}
              helperText={
                !!errors.comment
                  ? errors.comment.message
                  : "わかりやすい動画をありがとうございます🙇‍♂️"
              }
              {...register("comment")}
            />
          ) as any
        }
        contentText="講師へ感謝のコメントを書いてみましょう。コメントは講師の方へ送信されます。"
        confirmText="送信する"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
