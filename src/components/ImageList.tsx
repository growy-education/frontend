import { useEffect, useState } from "react";
import { Info, RotateLeft } from "@mui/icons-material";
import {
  Box,
  Button,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from "@mui/material";
import { ImageList as MuiImageList } from "@mui/material";
import { ImageEntity } from "../types/image.class";
import { CustomImage } from "./CustomImage";
import { useAxiosConfig } from "../contexts/AxiosContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import dayjs from "dayjs";

export const ImageList = () => {
  const { axiosConfig } = useAxiosConfig();
  const navigate = useNavigate();

  const [images, setImages] = useState<ImageEntity[]>([]);

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("images")
      .then((response) => {
        console.log(response.data);
        const images = response.data.map((responseJson) =>
          plainToInstance(ImageEntity, responseJson)
        );
        setImages(images);
      });
  }, [axiosConfig]);
  return (
    <MuiImageList
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
      cols={1}
    >
      {images.length === 0 && (
        <Typography>まだ画像がアップロードされていません。</Typography>
      )}
      {images.map((image) => (
        <ImageListItem
          key={`${image.id}-item`}
          sx={{
            maxWidth: "500px",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
          onClick={() => navigate(`/images/${image.id}`)}
        >
          <CustomImage id={image.id} loading="lazy" />
          <ImageListItemBar
            title={dayjs(image.createdAt).format(
              "アップロード日：YYYY年MM月DD日"
            )}
          />
        </ImageListItem>
      ))}
    </MuiImageList>
  );
};
