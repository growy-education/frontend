import { OpenInNew } from "@mui/icons-material";
import { Typography, TypographyProps } from "@mui/material";

export const GoogleChatLinkTypography = ({
  children,
  ...props
}: TypographyProps<"a">) => {
  return (
    <Typography
      component="a"
      href="https://mail.google.com/chat/"
      target="_blank"
      rel="noopener"
      sx={{
        verticalAlign: "bottom",
        display: "inline-flex",
        alignItems: "center",
      }}
      {...props}
    >
      GoogleChat
      <OpenInNew fontSize="small" />
    </Typography>
  );
};
