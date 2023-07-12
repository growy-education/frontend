import { Typography } from "@mui/material";

export const AttentionTitleTypography = ({ children, ...props }) => {
  return (
    <Typography
      sx={{
        fontWeight: "bold",
        borderBottom: "1px solid #25372F",
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
      width="10rem"
      mb={2}
      {...props}
    >
      {children}
    </Typography>
  );
};
