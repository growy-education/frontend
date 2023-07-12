import { Typography, TypographyProps } from "@mui/material";

export const PageTitleTypography = ({
  children,
  ...props
}: TypographyProps<"h2">) => {
  return (
    <Typography variant="h2" color="primary.main">
      {children}
    </Typography>
  );
};
