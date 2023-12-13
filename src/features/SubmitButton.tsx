import { Button, ButtonProps } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export const SubmitButton = ({ children, ...Props }: ButtonProps) => {
  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      endIcon={<SendIcon />}
      {...Props}
    >
      {children || "送信する"}
    </Button>
  );
};
