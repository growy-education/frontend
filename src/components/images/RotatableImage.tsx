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

  const [margin, setMargin] = useState<{
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  }>({});

  const [boxStyle, setBoxStyle] = useState<{
    width?: number;
    height?: number;
  }>({});

  const [imageStyle, setImageStyle] = useState<{
    width?: number;
    height?: number;
  }>({});

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

    if (imageSize.width >= imageSize.height) {
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
    } else {
      if (newRotation % 180 === 0) {
        setImageStyle({});
      } else {
        setImageStyle({
          width: imageSize.width ** 2 / imageSize.height,
          height: imageSize.width,
        });
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
          ...margin,
          ...imageStyle,
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
