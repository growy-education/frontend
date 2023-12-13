import { Link, Typography, TypographyProps } from "@mui/material";

export const HeaderListTypography = ({
  children,
  href,
  ...props
}: TypographyProps<"a">) => {
  return (
    <Link href={href}>
      <Typography
        sx={{
          fontSize: "0.95rem",
          fontWeight: "bold",
          color: "white",
          textDecoration: "none",
        }}
        {...props}
      >
        {children}
      </Typography>
    </Link>
  );
};
