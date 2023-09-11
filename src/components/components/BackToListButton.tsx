import { ArrowBack } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";

export const BackToListButton = (props: ButtonProps) => {
  return (
    <Button variant="outlined" startIcon={<ArrowBack />} {...props}>
      一覧に戻る
    </Button>
  );
};
