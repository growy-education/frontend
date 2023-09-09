import { Clear } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";

export const CancelEditButton = (props: ButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="error"
      endIcon={<Clear sx={{ color: "error.main" }} />}
      {...props}
    >
      変更を破棄する
    </Button>
  );
};
