import { Typography, TypographyProps } from "@mui/material";

export const VoiceInfoTypography = ({
  children,
  ...props
}: TypographyProps) => {
  return (
    <Typography fontWeight={"bold"} {...props}>
      {children}
    </Typography>
  );
};
