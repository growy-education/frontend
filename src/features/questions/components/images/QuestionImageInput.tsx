import { Box, FormHelperText } from "@mui/material";
import { ImagesListBox } from "./ImagesList";

import { FieldErrors } from "react-hook-form";
import { ImagesInput } from "./ImagesInput";
import { SelectImageButton } from "../../../../components/Element/Button/SelectImageButton";
import { resizeFile } from "../../../../tools/resizeFile";

type ProblemImageInputType = {
  type: "problems";
  files: File[];
  errors: FieldErrors<{ problems: File[] }>;
  handleInput: (values: File[]) => void;
};

type SolutionImageInputType = {
  type: "solutions";
  files: File[];
  errors: FieldErrors<{ solutions: File[] }>;
  handleInput: (values: File[]) => void;
};

export const QuestionImageInput = ({
  type,
  files,
  errors,
  handleInput,
}: ProblemImageInputType | SolutionImageInputType) => {
  const handleImageSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      const resizedFilesArray = await Promise.all(
        filesArray.map(async (file) => {
          try {
            const resizedFile = await resizeFile(file);
            return resizedFile as File;
          } catch (err) {
            return null;
          }
        })
      );
      handleInput(resizedFilesArray);
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
        <ImagesListBox files={files} />
      </Box>
      {!!errors[type] && (
        <FormHelperText>{errors[type].message}</FormHelperText>
      )}
      <ImagesInput
        handleImagesSelect={handleImageSelect}
        id={`${type}-image-input`}
      />
      <Box component="label" htmlFor={`${type}-image-input`}>
        <SelectImageButton>
          {(type === "problems" ? "問題" : "解答") + "の画像を選択する"}
        </SelectImageButton>
      </Box>
    </>
  );
};
