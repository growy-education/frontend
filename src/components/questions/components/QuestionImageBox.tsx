import { Box, BoxProps } from "@mui/material";
import { RotatableImage } from "../../images/RotatableImage";

type QuestionImageBoxProps = {
  id: string;
  key: string;
} & BoxProps;

export const QuestionImageBox = ({
  id,
  key,
  children,
  ...props
}: QuestionImageBoxProps) => {
  return (
    <Box
      m={2}
      id={`question-box-id-${id}`}
      key={`question-box-key-${key}`}
      {...props}
    >
      <RotatableImage id={id} key={`question-image-key-${key}`} />
    </Box>
  );
};
