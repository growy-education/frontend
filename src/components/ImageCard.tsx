import { useContext, useEffect, useState } from "react";
import { Card, CardMedia } from "@mui/material";
import axios from "axios";
import { AxiosContext } from "../contexts/AxiosContextProvider";
import { LoadingBox } from "./LoadingData";

type ImageCardProps = {
  id: string;
};

export const ImageCard = ({ id }: ImageCardProps) => {
  const { axiosConfig } = useContext(AxiosContext);
  const [imageData, setImageData] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.create(axiosConfig).get(
          "images" // 画像のAPIエンドポイント
        );
        setImageData(response.data); // 画像データを取得してセット
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    getImage();
  }, [axiosConfig, id]);

  return (
    <Card>
      {imageData ? (
        <CardMedia
          component="img"
          src={imageData}
          alt="Image"
          height="200"
          width="300"
        />
      ) : (
        <LoadingBox message="画像データの取得中です" />
      )}
    </Card>
  );
};
