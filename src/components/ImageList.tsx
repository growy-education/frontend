import { useEffect, useState } from "react";
import { RotateLeft } from "@mui/icons-material";
import { Box, Button, ImageListItem } from "@mui/material";
import { ImageList as MuiImageList } from "@mui/material";
import { ImageEntity } from "../types/image.class";
import { CustomImage } from "./CustomImage";
import { useAxiosConfig } from "../contexts/AxiosContextProvider";
import { useNavigate } from "react-router-dom";

export const ImageList = () => {
  const { axiosConfig } = useAxiosConfig();
  const navigate = useNavigate();

  const [images, setImages] = useState<ImageEntity[]>([]);

  useEffect(() => {}, [axiosConfig]);
  return (
    <MuiImageList sx={{ width: "100%" }} cols={3}>
      {images.map((image) => (
        <ImageListItem key={`${image.id}-item`}>
          <CustomImage id={image.id} />
        </ImageListItem>
      ))}
    </MuiImageList>
  );
};
