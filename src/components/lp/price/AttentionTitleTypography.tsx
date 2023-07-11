import { Typography } from "@mui/material";

export const AttentionTitleTypography = ({ children, ...props }) => {
  return (
    <Typography
      sx={{
        width: "10rem",
        fontWeight: "bold",
        borderBottom: "1px solid #25372F",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      mb={2}
      {...props}
    >
      {children}
    </Typography>
  );
};
