import { Box, BoxProps } from "@mui/material";

export const LineButton = (props: BoxProps) => {
  return (
    <Box
      position="fixed"
      bottom={1}
      zIndex={100}
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      <Box
        component="a"
        display="block"
        href="https://line.me/R/ti/p/@208okwey"
      >
        <img
          src="/img/img-btn-line-float-min.png"
          alt="LINE登録はこちらフロートボタン"
          style={{ width: "100%", maxWidth: "20rem" }}
        />
      </Box>
    </Box>
  );
};
