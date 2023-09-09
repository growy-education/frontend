import { Box, BoxProps } from "@mui/material";
import { QuestionImageBox } from "./QuestionImageBox";
import { ImageEntity } from "../../../dto/image.class";

type QuestionImagesBoxProps = {
  images: ImageEntity[];
} & BoxProps;

export const QuestionImagesBox = ({
  images,
  ...props
}: QuestionImagesBoxProps) => {
  return (
    <Box {...props}>
      {images.map((image, index) => (
        <QuestionImageBox id={image.id} key={`${image}-${index}`} />
      ))}
    </Box>
  );
};
