import { Typography, TypographyProps } from "@mui/material";

export const TeacherCommentTypography = ({
  children,
  ...props
}: TypographyProps<"h4">) => {
  return (
    <Typography
      component="h4"
      sx={{
        position: "relative",
        transform: "translateY(-10px)",
        marginTop: "20px",
        padding: "1.2em 1.8em",
        border: "2px solid #006837",
        borderRadius: "5px",
        backgroundColor: "#FAFEFF",
        color: "#25372F",
        textAlign: "left",
        "&::before, &::after": {
          backgroundColor: "primary.main",
          position: "absolute",
          top: "-15px",
          left: "1.2em",
          width: "30px",
          height: "15px",
          clipPath: "polygon(50% 0, 0 100%, 100% 100%)",
          content: '""',
        },
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};
