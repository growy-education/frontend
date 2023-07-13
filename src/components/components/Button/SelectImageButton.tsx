import { PhotoLibraryOutlined } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";

export const SelectImageButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="contained"
      component="span"
      endIcon={<PhotoLibraryOutlined />}
      {...props}
    >
      {children}
    </Button>
  );
};
