import { Button, ButtonProps } from "@mui/material";
import Edit from "@mui/icons-material/Edit";

export const EditQuestionButton = (props: ButtonProps) => {
  return (
    <Button variant="contained" endIcon={<Edit />} {...props}>
      編集する
    </Button>
  );
};
