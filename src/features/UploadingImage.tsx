import { Box, BoxProps } from "@mui/material";
import { useEffect, useState } from "react";

type NewImageBoxProps = {
  file: File;
} & BoxProps<"img">;

export const NewImageBox = ({ file, ...props }: NewImageBoxProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      setImageSize({ width, height });
    };
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
        height: "300px",
        aspectRatio:
          imageSize.height !== 0 && imageSize.width / imageSize.height,
        ...props.sx,
      }}
      {...props}
    />
  );
};
