import { Box, BoxProps } from "@mui/material";
import { DetailTypography } from "../Element/Typography/DetailTyporagphy";
import { HeadlineTypography } from "../Element/Typography/HeadlineTypography";

type IdProps = {
  id: string;
} & BoxProps;

export const Id = ({ id, ...props }: IdProps) => {
  if (typeof id !== "string") {
    return <></>;
  }
  return (
    <Box {...props}>
      <HeadlineTypography>{"ID"}</HeadlineTypography>
      <DetailTypography>{id}</DetailTypography>
    </Box>
  );
};
