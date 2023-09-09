import { Box, BoxProps } from "@mui/material";
import { RotatableImage } from "../../images/RotatableImage";

type QuestionImageBoxProps = {
  id: string;
} & BoxProps;

export const QuestionImageBox = ({
  id,
  children,
  ...props
}: QuestionImageBoxProps) => {
  return (
    <Box
      m={2}
      id={`question-box-id-${id}`}
      key={`question-box-key-${id}`}
      {...props}
    >
      <RotatableImage id={id} key={`question-image-key-${id}`} />
    </Box>
  );
};
