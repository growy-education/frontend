import { Block } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { Question } from "../../dto/question.class";
import { useCallback, useContext, useRef, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";

class RejectQuestionAnswerDto {
  @IsNotEmpty({ message: "拒否理由を入力してください" })
  @IsString()
  rejectedMessage: string;
}

type RejectQuestionAnswerButtonProps = {
  question: Question;
} & ButtonProps;

export const RejectQuestionAnswerButton = ({
  question,
  ...props
}: RejectQuestionAnswerButtonProps) => {
  const { rejectQuestionAnswerById } = useContext(QuestionContext);
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RejectQuestionAnswerDto>({
    resolver: classValidatorResolver(RejectQuestionAnswerDto),
    defaultValues: {
      rejectedMessage: "",
    },
  });

  const handleCancel = () => {
    setOpen(false);
    reset();
  };
  const handleClick = () => setOpen(true);

  const handleRejectQuestionAnswer: SubmitHandler<
    RejectQuestionAnswerDto
  > = async (data) => {
    if (sending) {
      return;
    }
    setSending(true);
    rejectQuestionAnswerById(question.id, data.rejectedMessage).finally(() =>
      setSending(false)
    );
    setOpen(false);
  };

  console.log(errors.rejectedMessage);

  return (
    <>
      <Button
        variant="outlined"
        color="warning"
        endIcon={<Block sx={{ color: "warning.main" }} />}
        disabled={question.status !== QuestionStatus.CHECKING}
        onClick={handleClick}
        {...props}
      >
        回答動画を拒否
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <Stack
          component="form"
          onSubmit={handleSubmit(handleRejectQuestionAnswer)}
        >
          <DialogTitle>回答動画を拒否する</DialogTitle>
          <DialogContent>
            <DialogContentText>
              回答動画を拒否する理由を入力してください。このメッセージは講師に送信されます。
            </DialogContentText>
            <TextField
              id="message"
              required
              label="講師へのメッセージ"
              fullWidth
              autoFocus
              multiline
              margin="dense"
              error={!!errors.rejectedMessage}
              helperText={
                !!errors.rejectedMessage
                  ? errors.rejectedMessage.message
                  : "講師に通知する拒否理由を入力してください"
              }
              {...register("rejectedMessage")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button color="warning" type="submit">
              確認
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
};
