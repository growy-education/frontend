import { useEffect, useState } from "react";
import { useAxiosConfig } from "../contexts/AxiosContextProvider";
import axios from "axios";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { LoadingData } from "./LoadingData";

type CustomImageProps = Exclude<React.HTMLProps<HTMLImageElement>, "src"> & {
  id: string;
};

export const CustomImage = ({ id, ...props }: CustomImageProps) => {
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
      <Alert severity="error">
        <AlertTitle>エラー</AlertTitle>
        画像データの取得に失敗しました。
        <Typography fontWeight="bold">
          ネットワーク環境を確認してください。
        </Typography>
      </Alert>
    );
  }

  return (
    <Box mb={2}>
      <img
        src={imageUrl}
        alt="取得した画像〜〜"
        style={{
          maxWidth: "100%",
          maxHeight: "50vh",
          aspectRatio:
            imageSize.height !== 0 && imageSize.width / imageSize.height,
        }}
      />
    </Box>
  );
};
