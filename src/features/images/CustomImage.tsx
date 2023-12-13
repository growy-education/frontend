import { useEffect, useState } from "react";

import { AlertBox } from "../AlertBox";
import { LoadingBox } from "../LoadingData";
import { useImageObjectURL } from "./api/getImage";

type CustomImageProps = Exclude<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  "src"
> & {
  id: string;
};

export const CustomImage = ({ id, style, ...props }: CustomImageProps) => {
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
    return <LoadingBox message="画像データの取得中です" />;
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
    <img
      src={url}
      alt={id}
      style={{
        width: "100%",
        aspectRatio:
          imageSize.height !== 0 && imageSize.width / imageSize.height,
        ...style,
      }}
      {...props}
    />
  );
};
