import { Box, ImageList, Skeleton } from "@mui/material";
import { UploadingImage } from "./UploadingImage";
import { ImageEntity } from "./types/image.class";

type UploadingImageListProps = {
  files: File[];
  images: ImageEntity[];
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
  resendFile: (file: File) => void;
};

export const UploadingImageList = ({
  files,
  images,
  addFile,
  removeFile,
  resendFile,
}: UploadingImageListProps) => {
  return (
    <Box maxWidth={"100%"}>
      {files.map((file, index) => (
        <UploadingImage
          key={`image-${file.name}-${index}`}
          alt={`送信予定の画像[${file.name}]`}
          file={file}
          image={images[index]}
          addFile={addFile}
          removeFile={removeFile}
          resendFile={resendFile}
        />
      ))}
    </Box>
  );
};
