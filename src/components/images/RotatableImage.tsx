import { useState } from "react";
import { Box, BoxProps, IconButton } from "@mui/material";

import { Rotate90DegreesCw } from "@mui/icons-material";
import { CustomImage } from "./CustomImage";

type RotatableImageProps = BoxProps & {
  id: string;
};

export const RotatableImage = ({ id, ...props }: RotatableImageProps) => {
  const [rotation, setRotation] = useState(0);

  const [imageSize, setImageSize] = useState<null | {
    width: number;
    height: number;
  }>(null);

  const [boxStyle, setBoxStyle] = useState<{
    width?: number;
    height?: number;
  }>({});

  const [imageStyle, setImageStyle] = useState<{
    width?: number;
    height?: number;
  }>({});

  const [marginTop, setMarginTop] = useState(0);

  // Set image width and height when this image is displayed
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
    setRotation(newRotation);
    if (newRotation % 180 === 0) {
      setBoxStyle({});
      setImageStyle({});
    } else {
      setBoxStyle({
        height: imageSize.width ** 2 / imageSize.height,
      });
      setImageStyle({
        height: imageSize.width,
        width: imageSize.width ** 2 / imageSize.height,
      });
    }
    if (imageSize.width <= imageSize.height) {
      if (newRotation % 180 === 0) {
        setMarginTop(0);
      } else {
        setMarginTop(
          (imageSize.width ** 2 - imageSize.height ** 2) /
            (2 * 2 * imageSize.height) +
            16
        );
      }
    }
  };

  return (
    <Box position="relative" {...props} style={{ ...props.style, ...boxStyle }}>
      <CustomImage
        id={id}
        onLoad={handleImageLoad}
        style={{
          transform: `rotate(${rotation}deg)`,
          transformOrigin:
            imageSize &&
            imageSize.width >= imageSize.height &&
            rotation % 180 === 90
              ? rotation === 90
                ? `${imageStyle.height / 2}px ${imageStyle.height / 2}px`
                : `${imageStyle.width / 2}px ${imageStyle.width / 2}px`
              : "center center",
          ...imageStyle,
          marginTop,
        }}
      />
      {!!imageSize && (
        <IconButton
          aria-label="rotate"
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleRotate}
        >
          <Rotate90DegreesCw />
        </IconButton>
      )}
    </Box>
  );
};