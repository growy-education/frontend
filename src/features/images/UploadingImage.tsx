import { BoxProps, ImageListItem, ImageListItemBar } from "@mui/material";

import { ImageEntity } from "./types/image.class";
import { NewImageBox } from "../UploadingImage";
import { UploadingImageTitle } from "./UploadingImageTitle";

type UploadingImageProps = {
  file: File;
  image: ImageEntity;
  addFile: (file: File) => void;
  removeFile: (file: File) => void;
  resendFile: (file: File) => void;
} & BoxProps<"img">;

/**
 * 渡された画像をバックエンドにPOSTする
 * 右上にステータス表示をする
 * POSTが成功すればPOST済みボタン
 * POSTに失敗すれば再送するボタン
 * @param file アップロードするファイル
 * @returns
 */
export const UploadingImage = ({
  image,
  file,
  addFile,
  removeFile,
  resendFile,
  ...props
}: UploadingImageProps) => {
  return (
    <ImageListItem sx={{ width: "100%" }}>
      <ImageListItemBar
        position="top"
        title={
          <UploadingImageTitle
            file={file}
            image={image}
            addFile={addFile}
            removeFile={removeFile}
            resendFile={resendFile}
          />
        }
      />
      <NewImageBox file={file} />
    </ImageListItem>
  );
};
