import { FC, forwardRef } from "react";

import { TextField, TextFieldProps } from "@mui/material";
import { FieldErrors } from "react-hook-form";

type QuestionContentTextFieldProps = {
  errors: FieldErrors<{ memo: string }>;
} & TextFieldProps;

export const QuestionMemoTextField: FC<QuestionContentTextFieldProps> =
  forwardRef(({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="memo"
        label="備考"
        multiline
        error={!!errors.memo}
        helperText={
          !!errors.memo
            ? errors.memo.message
            : "動画へのご要望があればお書きください。解説動画を作成するスタッフが確認いたします。"
        }
        ref={ref}
        {...props}
      />
    );
  });
