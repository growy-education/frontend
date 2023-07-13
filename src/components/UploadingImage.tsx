import { Box, BoxProps } from "@mui/material";
import { useEffect, useMemo } from "react";

type NewImageBoxProps = {
  file: File;
} & BoxProps<"img">;

export const NewImageBox = ({ file, ...props }: NewImageBoxProps) => {
  const url = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <Box
      component="img"
      sx={{ maxWidth: "100%", maxHeight: "300px" }}
      src={url}
      alt="送信予定の画像"
      onLoad={() => {
        URL.revokeObjectURL(url);
      }}
      {...props}
    />
  );
};
