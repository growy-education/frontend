import { ImageList, ImageListItem } from "@mui/material";
import { NewImageBox } from "../../../UploadingImage";

type ImagesListBoxProps = {
  files: File[];
};

export const ImagesListBox = ({ files }: ImagesListBoxProps) => {
  if (files.length === 0) {
    return;
  }
  return (
    <ImageList
      variant="masonry"
      cols={3}
      gap={8}
      sx={{ width: "100%", height: "500px" }}
    >
      {files.map((image, index) => (
        <ImageListItem key={`${index}-${image.name}`}>
          <NewImageBox file={image} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
