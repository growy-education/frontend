import { useState } from "react";
import { Button, ButtonProps } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { UseFormTrigger } from "react-hook-form";

type SubmitButtonProps<T> = ButtonProps & {
  onClick: () => void;
  trigger: UseFormTrigger<T>;
};

export const SubmitButton = <T,>({
  onClick,
  trigger,
  ...buttonProps
}: SubmitButtonProps<T>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClick = async () => {
    if (isSubmitting || !(await trigger())) {
      return;
    }

    setIsSubmitting(true);

    onClick();

    // ボタンのクリック処理完了後にisSubmittingをfalseに設定する
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      endIcon={<SendIcon />}
      onClick={handleClick}
      disabled={isSubmitting}
      {...buttonProps}
    >
      {isSubmitting ? "送信中..." : "送信"}
    </Button>
  );
};
