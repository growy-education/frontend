import { Save } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";

export const SaveEditButton = (props: ButtonProps) => {
  return (
    <Button
      type="submit"
      color="primary"
      variant="contained"
      endIcon={<Save />}
      {...props}
    >
      変更を保存する
    </Button>
  );
};
