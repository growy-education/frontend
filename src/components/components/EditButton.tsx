import { Button, ButtonProps } from "@mui/material";
import Edit from "@mui/icons-material/Edit";

export const EditButton = (props: ButtonProps) => {
  return (
    <Button variant="contained" endIcon={<Edit />} {...props}>
      編集する
    </Button>
  );
};
