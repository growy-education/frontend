import { useEffect, useState } from "react";
import { CardMedia, CardMediaProps, Skeleton } from "@mui/material";

import { LoadingBox } from "../LoadingData";
import { AlertBox } from "../AlertBox";
import { axios } from "../../tools/axios";
import { useImageObjectURL } from "../images/api/getImage";

type QuestionCardMediaProps = {
  id: string;
} & CardMediaProps<"img">;

export const QuestionCardMedia = ({
  id,
  children,
  ...props
}: QuestionCardMediaProps) => {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const { data: url, isPending, isError } = useImageObjectURL({ imageId: id });

  useEffect(() => {
    // 画像サイズを取得する
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const width = image.width;
      const height = image.height;
      setImageSize({ width, height });
    };

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [url]);

  if (isPending) {
    return <Skeleton variant="rectangular" width={"100%"} height={200} />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラー"
        description="画像データの取得に失敗しました。ネットワーク環境を確認してください。"
      />
    );
  }

  return (
    <CardMedia
      component="img"
      src={url}
      alt={id}
      sx={{
        maxWidth: "100%",
        aspectRatio:
          imageSize.height !== 0 && imageSize.width / imageSize.height,
      }}
      {...props}
    />
  );
};
