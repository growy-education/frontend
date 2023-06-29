import { useState } from "react";
import { Box, BoxProps, IconButton } from "@mui/material";

import { Rotate90DegreesCw } from "@mui/icons-material";
import { CustomImage } from "./CustomImage";

type RotatableImageProps = BoxProps & {
  id: string;
};
export const RotatableImage = ({ id, ...props }: RotatableImageProps) => {
  const [imageSize, setImageSize] = useState<null | {
    width: number;
    height: number;
  }>(null);
  const [rotation, setRotation] = useState(0);
  const [margin, setMargin] = useState<{
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  }>({});

  const handleImageLoad: React.ReactEventHandler<HTMLImageElement> = (
    event
  ) => {
    setImageSize({
      width: event.currentTarget.width,
      height: event.currentTarget.height,
    });
  };

  const handleRotate = () => {
    const newRotation = (rotation + 90) % 360;
    if (imageSize.width >= imageSize.height) {
      if (rotation % 180 === 0) {
        setRotation(newRotation);
        setMargin({
          marginTop: (imageSize.width - imageSize.height) / 2,
          marginBottom: (imageSize.width - imageSize.height) / 2,
        });
      } else {
        setRotation(newRotation);
        setMargin({});
      }
    }
  };

  return (
    <Box position="relative" {...props}>
      <CustomImage
        id={id}
        onLoad={handleImageLoad}
        style={{ transform: `rotate(${rotation}deg)`, ...margin }}
      />
      {!!imageSize && (
        <IconButton
          aria-label="rotate"
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleRotate}
        >
          <Rotate90DegreesCw />
        </IconButton>
      )}
    </Box>
  );
};
