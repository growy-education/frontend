import { useEffect, useState } from "react";
import axios from "axios";
import { CardMedia, CardMediaProps } from "@mui/material";

import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import { LoadingBox } from "../LoadingData";
import { AlertBox } from "../AlertBox";

type QuestionCardMediaProps = {
  id: string;
} & CardMediaProps<"img">;

export const QuestionCardMedia = ({
  id,
  children,
  ...props
}: QuestionCardMediaProps) => {
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
  }, [axiosConfig, id]);

  if (error) {
    return (
      <AlertBox
        severity="error"
        title="エラー"
        description="画像データの取得に失敗しました。ネットワーク環境を確認してください。"
      />
    );
  }

  if (!imageUrl) {
    return <LoadingBox message="画像データの取得中です" />;
  }

  return (
    <CardMedia
      component="img"
      src={imageUrl}
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
