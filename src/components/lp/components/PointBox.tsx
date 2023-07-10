import { Box, BoxProps } from "@mui/material";
/**
 * ポイントの背景を作る
 */
export const PointBox = ({ children, ...props }: BoxProps) => {
  return (
    <Box
      pt={1}
      pb={1}
      style={{
        backgroundColor: "rgba(22, 22, 22, 0.4)",
        color: "#FAFEFF",
        fontSize: "3rem",
        display: "flex",
        textAlign: "center",
        margin: "0 auto",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};
