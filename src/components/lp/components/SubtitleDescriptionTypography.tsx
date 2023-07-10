import { Typography, TypographyProps } from "@mui/material";

export const SubtitleDescriptionTypography = ({
  children,
  ...props
}: TypographyProps) => {
  return (
    <Typography fontSize="1.2rem" fontWeight="bold" {...props}>
      {children}
    </Typography>
  );
};
