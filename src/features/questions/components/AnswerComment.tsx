import { Box, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { Task } from "../../tasks/types/task.class";
import { Question } from "../types/question.class";
import { useEffect, useState } from "react";
import { useSendRatingToAnswer } from "../api/sendRatingToAnswer";
import { SubmitHandler, useForm } from "react-hook-form";
import { QuestionAnswerRatingDto } from "../types/answer-rating.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Cancel, Edit, Save } from "@mui/icons-material";

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography textAlign={"left"}>動画へのコメント：</Typography>

        <Box>
          {isEditing && (
            <IconButton type="submit" arial-label="save-button">
              <Save color="primary" fontSize="large" />
            </IconButton>
          )}
          <IconButton aria-label="edit-button">
            {isEditing ? (
              <Cancel
                color="warning"
                fontSize="large"
                onClick={() => setIsEditing(false)}
              />
            ) : (
              <Tooltip title="動画にコメントしてみよう" placement="left-end">
                <Edit onClick={() => setIsEditing(true)} />
              </Tooltip>
            )}
          </IconButton>
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              id="comment"
              label="コメント"
              error={!!errors.comment}
              helperText={
                !!errors.comment
                  ? errors.comment.message
                  : "例)わかりやすい解説をありがとうございます。"
              }
              {...register("comment")}
            />
          </>
        ) : (
          <Typography>{task.comment}</Typography>
        )}
      </Box>
    </Box>
  );
};
