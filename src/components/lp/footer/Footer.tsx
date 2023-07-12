import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box p={3} pb={12} sx={{ backgroundColor: "#006837", color: "#F6F9F8" }}>
      <Box component="nav">
        <Typography>
          <Typography
            component="a"
            sx={{
              fontSize: "0.8rem",
              color: "#F6F9F8",
              textDecoration: "none",
            }}
            href="https://honnedechuju.com/%e7%89%b9%e5%ae%9a%e5%95%86%e5%8f%96%e5%bc%95%e6%b3%95%e3%81%ab%e5%9f%ba%e3%81%a5%e3%81%8f%e8%a1%a8%e8%a8%98%e3%81%ab%e3%81%a4%e3%81%84%e3%81%a6"
          >
            特定商取引法に基づく表記
          </Typography>
        </Typography>
        <Typography>
          <Typography
            component="a"
            sx={{
              fontSize: "0.8rem",
              color: "#F6F9F8",
              textDecoration: "none",
            }}
            href="https://honnedechuju.com/%e5%80%8b%e5%88%a5%e6%8c%87%e5%b0%8e%e5%a1%begrowy-%e3%83%97%e3%83%a9%e3%82%a4%e3%83%90%e3%82%b7%e3%83%bc%e3%83%9d%e3%83%aa%e3%82%b7%e3%83%bc"
          >
            プライバシーポリシー（個人情報保護方針）
          </Typography>
        </Typography>
        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#F6F9F8",
            textDecoration: "none",
          }}
        >
          © 2023 (株)Grabit.
        </Typography>
      </Box>
    </Box>
  );
};
