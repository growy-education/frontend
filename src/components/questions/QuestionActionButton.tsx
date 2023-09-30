import { KeyboardArrowDown } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";

export const QuestionActionButton = (props: ButtonProps) => {
  return (
    <Button
      id="question-action-button"
      aria-haspopup="true"
      variant="contained"
      disableElevation
      endIcon={<KeyboardArrowDown />}
      {...props}
    >
      質問を操作する
    </Button>
  );
};
