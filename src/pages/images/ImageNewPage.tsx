import { ChangeEvent, useCallback, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { Image } from "@mui/icons-material";
import { ImageEntity } from "../../features/images/types/image.class";
import { UploadingImageList } from "../../features/images/UploadingImageList";

export const ImageNew = () => {
  const [uploadingImages, setUploadingImages] = useState<
    { file: File; result: ImageEntity | null }[]
  >([]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadingImages(files.map((file) => ({ file, result: null })));
    }
  };

  return (
    <>
      <Typography variant="h4">新しい画像をアップロード</Typography>
      {/* <Box display="flex" flexDirection="column">
        <UploadingImageList uploadingImages={uploadingImages} />

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
      </Box> */}
    </>
  );
};
