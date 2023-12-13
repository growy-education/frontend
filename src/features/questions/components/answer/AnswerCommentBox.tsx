import { Box, BoxProps, Typography } from "@mui/material";
import { FieldErrors } from "react-hook-form";
import { AnswerCommentTextField } from "./AnswerCommentTextField";

type AnswerCommentBoxProps = {
  answer: string;
  errors: FieldErrors<{ comment: string }>;
} & BoxProps;

export const AnswerCommentBox = ({
  answer,
  errors,
  ...props
}: AnswerCommentBoxProps) => {
  return (
    <Box {...props}>
      <Typography>コメントがあればご入力ください</Typography>
      <Typography component={"span"}></Typography>
      <AnswerCommentTextField answer={answer} errors={errors} />
    </Box>
  );
};
