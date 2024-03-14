import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { Task } from "../../tasks/types/task.class";
import { Question } from "../types/question.class";
import { useEffect, useState } from "react";
import { useSendRatingToAnswer } from "../api/sendRatingToAnswer";
import { SubmitHandler, useForm } from "react-hook-form";
import { QuestionAnswerRatingDto } from "../types/answer-rating.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Cancel, Edit, Send } from "@mui/icons-material";

type AnswerCommentProps = {
  question: Question;
  task: Task;
};

export const AnswerComment = ({ question, task }: AnswerCommentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<QuestionAnswerRatingDto>({
    resolver: classValidatorResolver(QuestionAnswerRatingDto),
    defaultValues: {
      comment: "",
    },
  });

  useEffect(() => {
    setValue("comment", task.comment || "");
  }, [setValue, task.comment]);

  const mutation = useSendRatingToAnswer({
    options: {
      onSettled: () => setIsEditing(false),
    },
  });

  const handleConfirm: SubmitHandler<QuestionAnswerRatingDto> = async (
    data
  ) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({
      questionId: question.id,
      answer: task.answer,
      dto: data,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleConfirm)}>
      {typeof task?.comment === "string" && !!task?.comment ? (
        <Box my={1}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography textAlign={"left"}>動画へのコメント：</Typography>
            <IconButton aria-label="edit-button">
              {isEditing ? (
                <Cancel
                  color="warning"
                  fontSize="large"
                  onClick={() => setIsEditing(false)}
                />
              ) : (
                <Tooltip title="コメントを編集する" placement="left-end">
                  <Edit onClick={() => setIsEditing(true)} />
                </Tooltip>
              )}
            </IconButton>
          </Box>
          {isEditing ? (
            <Box
              my={1}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                id="comment"
                label="動画へコメントしてみよう"
                multiline
                error={!!errors.comment}
                helperText={
                  !!errors.comment
                    ? errors.comment.message
                    : "例)わかりやすい解説をありがとうございます。"
                }
                {...register("comment")}
              />
              <IconButton
                type="submit"
                arial-label="save-button"
                sx={{ mb: 3 }}
              >
                <Send color="primary" fontSize="large" />
              </IconButton>
            </Box>
          ) : (
            <Typography>{task.comment}</Typography>
          )}
        </Box>
      ) : (
        <Box
          my={1}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            id="comment"
            label="動画へコメントしてみよう"
            multiline
            error={!!errors.comment}
            helperText={
              !!errors.comment
                ? errors.comment.message
                : "例)わかりやすい解説をありがとうございます。"
            }
            {...register("comment")}
          />
          <IconButton type="submit" arial-label="save-button" sx={{ mb: 3 }}>
            <Send color="primary" fontSize="large" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};
