import { Box, BoxProps } from "@mui/material";
import { UploadingImageStatusIcon } from "./UploadingImageStatusIcon";
import { UploadingImageAction } from "./UploadingImageActionIcon";
import { ImageEntity } from "./types/image.class";

type UploadingImageTitleProps = {
  file: File;
  image: ImageEntity;
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
  resendFile: (file: File) => void;
} & BoxProps;

export const UploadingImageTitle = ({
  file,
  image,
  addFile,
  removeFile,
  resendFile,
  ...props
}: UploadingImageTitleProps) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <UploadingImageStatusIcon file={file} image={image} />
      <UploadingImageAction
        file={file}
        image={image}
        removeFile={removeFile}
        resendFile={resendFile}
      />
    </Box>
  );
};
