import { Box, BoxProps } from "@mui/material";
import { QuestionImageBox } from "./QuestionImageBox";
import { ImageEntity } from "../../images/types/image.class";

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
        <QuestionImageBox
          id={image.id}
          image={image}
          key={`${image}-${index}`}
        />
      ))}
    </Box>
  );
};
