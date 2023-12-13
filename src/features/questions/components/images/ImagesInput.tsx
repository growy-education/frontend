import { Box, BoxProps } from "@mui/material";

type ImagesInputProps = {
  handleImagesSelect: React.ChangeEventHandler<HTMLInputElement>;
} & BoxProps<"input">;

export const ImagesInput = ({
  handleImagesSelect,
  ...props
}: ImagesInputProps) => {
  return (
    <>
      <Box
        component="input"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImagesSelect}
        style={{ display: "none" }}
        {...props}
      />
    </>
  );
};
