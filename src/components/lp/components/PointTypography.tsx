import { Typography, TypographyProps } from "@mui/material";

export const PointTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      {...props}
      sx={{
        verticalAlign: "middle",
        paddingTop: ".3rem",
        fontSize: "2rem",
        fontWeight: "bold",
        color: "white",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};
