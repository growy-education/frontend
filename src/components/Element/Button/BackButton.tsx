import { ArrowBack } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const BackButton = (props: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBack />}
      onClick={() => navigate(-1)}
      {...props}
    >
      戻る
    </Button>
  );
};
