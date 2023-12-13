import { Typography, TypographyProps } from "@mui/material";

export const AttentionDescriptionTypography = ({
  children,
  ...props
}: TypographyProps) => {
  return (
    <Typography textAlign={"left"} {...props}>
      {children}
    </Typography>
  );
};
