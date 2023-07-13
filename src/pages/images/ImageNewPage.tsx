import { ChangeEvent, useState } from "react";
import { Box, Button, ImageList, Typography } from "@mui/material";

import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import { Image, Upload } from "@mui/icons-material";
import axios from "axios";

export const ImageNew = () => {
  const { axiosConfig } = useAxiosConfig();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedImages(files);
    }
  };

  const handleUpload = () => {
    if (selectedImages.length > 0) {
      // ここに画像のアップロード処理を実装する
      console.log("Uploading images:", selectedImages);
      Promise.all(
        selectedImages.map((file: File) => {
          const formData = new FormData();
          formData.append("file", file);
          axios
            .create(axiosConfig)
            .post("images", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => response.data.id as string)
            .catch((error) => {
              console.log(error);
            });
        })
      );
    } else {
      console.log("No images selected.");
    }
  };

  return (
    <>
      <Typography variant="h4">新しい画像をアップロード</Typography>
      <Box display="flex" flexDirection="column">
        <ImageList>
          {selectedImages.length > 0 &&
            selectedImages.map((image: File, index: number) => (
              <img
                key={`image-${index}`}
                style={{ maxWidth: "100%", maxHeight: "300px" }}
                src={URL.createObjectURL(image)}
                alt="送信予定の画像"
              />
            ))}
        </ImageList>

        <input
          id="upload-input"
          type="file"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="upload-input">
          <Button
            variant="outlined"
            color="primary"
            endIcon={<Image />}
            component="span"
          >
            画像を選択する
          </Button>
        </label>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleUpload}
          endIcon={<Upload />}
        >
          アップロード
        </Button>
      </Box>
    </>
  );
};
