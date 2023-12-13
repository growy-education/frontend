import { Typography, TypographyProps } from "@mui/material";
import OpenInNew from "@mui/icons-material/OpenInNew";

export const LineLinkTypography = ({
  children,
  ...props
}: TypographyProps<"a">) => {
  return (
    <Typography
      component="a"
      href="https://line.me/R/ti/p/@208okwey"
      target="_blank"
      rel="noopener"
      sx={{
        verticalAlign: "bottom",
        display: "inline-flex",
        alignItems: "center",
      }}
      {...props}
    >
      公式ライン
      <OpenInNew fontSize="small" />
    </Typography>
  );
};
