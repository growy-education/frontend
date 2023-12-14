import { Box, BoxProps } from "@mui/material";
import { useEffect, useState } from "react";

type NewImageBoxProps = {
  file: File;
} & BoxProps<"img">;

export const NewImageBox = ({ file, ...props }: NewImageBoxProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    // コンポーネントがアンマウントされたときにURLを解放
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  return (
    <Box
      component="img"
      src={imageUrl}
      alt="送信予定の画像"
      sx={{
        width: "100%",
        ...props.sx,
      }}
      {...props}
    />
  );
};
