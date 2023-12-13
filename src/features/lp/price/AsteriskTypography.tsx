import { Typography, TypographyProps } from "@mui/material";

export const AsteriskTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography mt={"0.1rem"} mr={1} {...props}>
      *
    </Typography>
  );
};
