import { IconButton, IconButtonProps } from "@mui/material";

export const HeaderIconButton = ({
  children,
  ...props
}: IconButtonProps<any>) => {
  return (
    <IconButton sx={{ color: "white" }} {...props}>
      {children}
    </IconButton>
  );
};
