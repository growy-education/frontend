import { Typography, TypographyProps } from "@mui/material";

export const HeadlineTypography = ({
  children,
  ...props
}: TypographyProps<"h4">) => {
  return (
    <Typography variant="h4" align="left" m={1} {...props}>
      {children}
    </Typography>
  );
};
