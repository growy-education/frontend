import { Typography, TypographyProps } from "@mui/material";

export const SubtitleTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography color="white" fontWeight="bold" {...props}>
      {children}
    </Typography>
  );
};
