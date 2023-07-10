import { IconButton, IconButtonProps } from "@mui/material";

export const HeaderIconButton = ({ children, ...props }: IconButtonProps) => {
  return (
    <IconButton
      sx={{
        fontWeight: "bold",
        color: "white",
        textDecoration: "none",
      }}
      {...props}
    >
      {children}
    </IconButton>
  );
};
