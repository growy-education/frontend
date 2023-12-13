import { Typography, TypographyProps } from "@mui/material";

export const VoiceCommentTypography = ({
  children,
  ...props
}: TypographyProps) => {
  return (
    <Typography fontSize={"0.85rem"} {...props}>
      {children}
    </Typography>
  );
};
