import { useEffect, useState } from "react";
import axios from "axios";

import { AlertBox } from "./AlertBox";
import { LoadingData } from "./LoadingData";
import { useAxiosConfig } from "../contexts/AxiosContextProvider";

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
  const { axiosConfig } = useAxiosConfig();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios
          .create(axiosConfig)
          .get(`images/${id}`, { responseType: "blob" });
        const blob = new Blob([response.data]);
        const url = URL.createObjectURL(blob);
        setImageUrl(url);

        // 画像サイズを取得する
        const image = new Image();
        image.src = url;
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          setImageSize({ width, height });
        };
      } catch (error) {
        setError(true);
      }
    };

    fetchImage();

    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosConfig, id]);

  if (!imageUrl) {
    return <LoadingData message="画像データの取得中です" />;
  }

  if (error) {
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
      src={imageUrl}
      alt={id}
      style={{
        maxWidth: "90%",
        aspectRatio:
          imageSize.height !== 0 && imageSize.width / imageSize.height,
        ...style,
      }}
      {...props}
    />
  );
};
