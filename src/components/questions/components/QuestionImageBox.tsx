import { Box, BoxProps, Button } from "@mui/material";
import { RotatableImage } from "../../images/RotatableImage";
import { ImageEntity } from "../../../dto/image.class";
import { FileOpen, OpenInNew } from "@mui/icons-material";

type QuestionImageBoxProps = {
  id: string;
  image: ImageEntity;
} & BoxProps;

export const QuestionImageBox = ({
  id,
  image,
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
      <Box display="flex" justifyContent="flex-end">
        <Button
          endIcon={<OpenInNew />}
          href={`https://drive.google.com/file/d/${image.driveId}/view`}
          target="_blank"
          rel="noreferrer"
          sx={{
            textTransform: "none",
          }}
        >
          GoogleDriveで開く
        </Button>
      </Box>
      <RotatableImage id={id} image={image} key={`question-image-key-${id}`} />
    </Box>
  );
};
