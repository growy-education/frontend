import { BoxProps, Chip } from "@mui/material";
import { Done, SyncProblem } from "@mui/icons-material";
import { ImageEntity } from "./types/image.class";

type UploadingImageStatusProps = {
  image: ImageEntity;
  file: File;
} & BoxProps;

export const UploadingImageStatusIcon = ({
  image,
  file,

  ...props
}: UploadingImageStatusProps) => {
  if (image instanceof ImageEntity) {
    return (
      <Chip
        color="success"
        label="アップ済み"
        icon={<Done color="success" />}
      />
    );
  }
  return (
    <Chip color="error" label="エラー" icon={<SyncProblem color="error" />} />
  );
};
