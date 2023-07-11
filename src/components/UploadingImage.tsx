import axios from "axios";
import { useEffect, useState } from "react";
import { useAxiosConfig } from "../contexts/AxiosContextProvider";
import { Box, CircularProgress, IconButton } from "@mui/material";
import {
  CloudDone,
  CloudUploadOutlined,
  ErrorOutline,
} from "@mui/icons-material";

type UploadingImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  file: File;
  handleImageId: (id: string) => void;
};

export const UploadingImage = ({
  file,
  handleImageId,
  ...props
}: UploadingImageProps) => {
  const { axiosConfig } = useAxiosConfig();

  const [uploading, setUploading] = useState(true);
  const [uploaded, setUploaded] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {}, [axiosConfig, file, handleImageId, reload]);

  return (
    <Box position="relative">
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        {...props}
      />
      {uploading ? (
        // 送信中であれば、画像の右上にCircularProgress
        <CircularProgress style={{ position: "absolute", top: 0, right: 0 }} />
      ) : uploaded ? (
        // 送信済みかつアップロード済みであれば、クラウドにアップロード済みのアイコン
        <CloudDone
          color="success"
          sx={{ position: "absolute", top: 0, right: 0 }}
        />
      ) : (
        // 送信済みかつアップロードに失敗していれば、
        // もう一度クラウドにアップロードするアイコンボタンと
        // ステータスを表示する
        <>
          <ErrorOutline
            color="error"
            sx={{ position: "absolute", top: 0, right: 0 }}
          />
          <IconButton
            onClick={() => setReload(true)}
            sx={{ position: "absolute", top: 0, left: 0 }}
          >
            <CloudUploadOutlined />
          </IconButton>
        </>
      )}
    </Box>
  );
};
