import { Typography, TypographyProps } from "@mui/material";

export const CoachingTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      component="span"
      style={{ color: "#05712E", fontWeight: 700 }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const TeachingTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      component="span"
      style={{ color: "#3D9654", fontWeight: 700 }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const BoldTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography component="span" fontWeight={700} {...props}>
      {children}
    </Typography>
  );
};

export const RedBoldTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography component="span" color="red" fontWeight={700} {...props}>
      {children}
    </Typography>
  );
};

export const CoachingPointTypography = ({
  children,
  ...props
}: TypographyProps) => {
  return (
    <Typography
      style={{
        fontSize: "1.5rem",
        marginBottom: "3%",
        fontWeight: 600,
        lineHeight: "2.0rem",
        color: "#05712E",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const TeachingPointTypography = ({
  children,
  ...props
}: TypographyProps) => {
  return (
    <Typography
      style={{
        fontSize: "2.5rem",
        marginBottom: "3%",
        fontWeight: 600,
        lineHeight: "3rem",
        color: "#3D9654",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};
