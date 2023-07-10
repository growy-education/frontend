import { Typography, TypographyProps } from "@mui/material";

export const TitleTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography fontSize="1.5rem" color="white" fontWeight="bold" {...props}>
      {children}
    </Typography>
  );
};
