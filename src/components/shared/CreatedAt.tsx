import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../Element/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../Element/Typography/JaDateTimeTypography";

type CreatedAtProps = {
  createdAt: Date;
} & BoxProps;

export const CreatedAt = ({ createdAt, ...props }: CreatedAtProps) => {
  if (!(createdAt instanceof Date)) {
    return <></>;
  }
  return (
    <Box {...props}>
      <HeadlineTypography>作成日時</HeadlineTypography>
      <JaDateTimeTypography textAlign="right" date={createdAt} />
    </Box>
  );
};
