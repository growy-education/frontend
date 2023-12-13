import { Box, FormHelperText } from "@mui/material";
import { ImagesInput } from "./ImagesInput";

import { FieldErrors } from "react-hook-form";
import { SelectImageButton } from "../../../../components/Element/Button/SelectImageButton";
import { UploadingImageList } from "../../../images/UploadingImageList";
import { ImageEntity } from "../../../images/types/image.class";
import { useState } from "react";
import { useDeleteImage } from "../../../images/api/ deleteImage";
import { useCreateImageEntity } from "../../../images/api/createImage";

type ProblemImagesInputType = {
  type: "problems";
  errors: FieldErrors<{ problems: ImageEntity[] }>;
};

type SolutionImagesInputType = {
  type: "solutions";
  errors: FieldErrors<{ solutions: ImageEntity[] }>;
};

type QuestionImagesInputProps = {
  images: ImageEntity[];
  setImages: (results: ImageEntity[]) => void;
} & (ProblemImagesInputType | SolutionImagesInputType);

export const QuestionImagesInput = ({
  type,
  images,
  setImages,
  errors,
}: QuestionImagesInputProps) => {
  const uploadImageMutation = useCreateImageEntity();
  const deleteImageMutation = useDeleteImage();
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleImageSelect: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    setProcessing(true);
    if (event.target.files) {
      images.forEach((image) => {
        if (image instanceof ImageEntity) {
          deleteImageMutation.mutate(image.id);
        }
      });
      const newFiles = Array.from(event.target.files);
      const newImages = await Promise.all(
        newFiles.map(async (file) => {
          try {
            const image = await uploadImageMutation.mutateAsync(file);
            if (image instanceof ImageEntity) {
              return image;
            } else {
              return null;
            }
          } catch (error) {
            console.log(error);
            return null;
          }
        })
      );
      setFiles(newFiles);
      setImages(newImages);
    }
    setProcessing(false);
  };

  const addFile = async (fileToBeAdded: File) => {
    if (files.includes(fileToBeAdded)) {
      return;
    }
    let image: ImageEntity;
    try {
      image = await uploadImageMutation.mutateAsync(fileToBeAdded);
    } catch (error) {
      console.log(error);
    }
    if (image instanceof ImageEntity) {
      setFiles([...files, fileToBeAdded]);
      setImages([...images, image]);
    }
  };

  const removeFile = async (fileToBeRemoved: File) => {
    const indexToBeRemoved = files.findIndex(
      (file) => file === fileToBeRemoved
    );
    if (indexToBeRemoved === -1) {
      return;
    }
    const imageToBeDeleted = images[indexToBeRemoved];
    if (imageToBeDeleted instanceof ImageEntity) {
      deleteImageMutation.mutateAsync(imageToBeDeleted.id);
    }
    setFiles([...files.filter((_file, index) => index !== indexToBeRemoved)]);
    setImages([
      ...images.filter((_image, index) => index !== indexToBeRemoved),
    ]);
  };

  const resendFile = async (fileToBeResended: File) => {
    const indexToBeResended = files.findIndex(
      (file) => file === fileToBeResended
    );
    if (indexToBeResended === -1) {
      return;
    }
    const imageToBeResended = images[indexToBeResended];
    if (imageToBeResended instanceof ImageEntity) {
      return;
    }
    try {
      const resendedImage = await uploadImageMutation.mutateAsync(
        fileToBeResended
      );
      if (resendedImage instanceof ImageEntity) {
        setImages(
          images.map((image, index) => {
            if (index === indexToBeResended) {
              return resendedImage;
            } else {
              return image;
            }
          })
        );
      }
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <Box
        sx={{
          mt: 2,
          mb: 1,
          display: "flex",
          overflowX: "auto",
        }}
      >
        {files.length === images.length && (
          <UploadingImageList
            files={files}
            images={images}
            addFile={addFile}
            removeFile={removeFile}
            resendFile={resendFile}
          />
        )}
      </Box>
      {!!errors[type] && (
        <FormHelperText>{errors[type].message}</FormHelperText>
      )}
      <ImagesInput
        handleImagesSelect={handleImageSelect}
        id={`${type}-image-input`}
      />
      <Box component="label" htmlFor={`${type}-image-input`}>
        <SelectImageButton disabled={processing}>
          {(type === "problems" ? "問題" : "解答") + "の画像を選択する"}
        </SelectImageButton>
      </Box>
    </>
  );
};
