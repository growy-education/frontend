import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  MenuItemProps,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Question } from "../../dto/question.class";
import { Feedback } from "@mui/icons-material";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { IsNotEmpty, IsString } from "class-validator";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

class ReportQuestionDto {
  @IsNotEmpty({ message: "報告理由を入力してください" })
  @IsString()
  reportMessage: string;
}

type ReportQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const ReportQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: ReportQuestionMenuItemProps) => {
  const { reportQuestionById } = useContext(QuestionContext);
  const [sending, setSending] = useState(false);
  const [open, setOpen] = useState(false);

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
    if (onClick) {
      onClick(null);
    }
    reset();
  };
  const handleClick = () => setOpen(true);

  const handleRejectQuestionAnswer: SubmitHandler<ReportQuestionDto> = async (
    data
  ) => {
    if (sending) {
      return;
    }
    setSending(true);
    reportQuestionById(question.id, data.reportMessage).finally(() =>
      setSending(false)
    );
    setOpen(false);
    if (onClick) {
      onClick(null);
    }
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
      <Dialog open={open} onClose={handleCancel}>
        <Stack
          component="form"
          onSubmit={handleSubmit(handleRejectQuestionAnswer)}
        >
          <DialogTitle>質問を運営に報告する</DialogTitle>
          <DialogContent>
            <DialogContentText>
              質問を報告する理由を入力してください。このメッセージは運営に送信されます。
            </DialogContentText>
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
