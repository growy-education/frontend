import { Box, ImageList, ImageListItem } from "@mui/material";
import { NewImageBox } from "../../../UploadingImage";

type ImagesListBoxProps = {
  images: File[];
};

export const ImagesListBox = ({ images }: ImagesListBoxProps) => {
  if (images.length === 0) {
    return;
  }
  return (
    <Box sx={{ width: "100%", overflowX: "scroll" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {images.map((image, index) => (
          <ImageListItem key={`${index}-${image.name}`}>
            <NewImageBox file={image} />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};
