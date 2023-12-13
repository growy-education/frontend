import { useNavigate } from "react-router-dom";
import { Button, ButtonProps } from "@mui/material";
import { Clear } from "@mui/icons-material";

export const CancelEditButton = (props: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      color="error"
      endIcon={<Clear sx={{ color: "error.main" }} />}
      {...props}
      onClick={(event) => {
        navigate(-1);
        props?.onClick(event);
      }}
    >
      変更を破棄する
    </Button>
  );
};
