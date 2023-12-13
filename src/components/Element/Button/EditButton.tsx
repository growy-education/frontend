import { Button, ButtonProps } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

export const EditButton = ({ children, ...props }: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      endIcon={<Edit />}
      onClick={() => navigate("edit")}
      {...props}
    >
      {children || "編集する"}
    </Button>
  );
};
