import { Button, ButtonProps } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

export const ActionButton = (props: ButtonProps) => {
  return (
    <Button
      aria-haspopup="true"
      variant="contained"
      disableElevation
      endIcon={<KeyboardArrowDown />}
      {...props}
    >
      {props.children || "操作する"}
    </Button>
  );
};
