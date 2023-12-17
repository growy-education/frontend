import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../Element/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../Element/Typography/JaDateTimeTypography";

type UpdatedAtProps = {
  updatedAt: Date;
} & BoxProps;

export const UpdatedAt = ({ updatedAt, ...props }: UpdatedAtProps) => {
  if (!(updatedAt instanceof Date)) {
    return <></>;
  }
  return (
    <Box {...props}>
      <HeadlineTypography>更新日時</HeadlineTypography>
      <JaDateTimeTypography textAlign="right" date={updatedAt} />
    </Box>
  );
};
