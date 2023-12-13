import { Typography, TypographyProps } from "@mui/material";
import { QuestionStatus } from "../../types/question-status.enum";

type QuesitonStatusTypographyProps = {
  status: QuestionStatus;
} & TypographyProps;

export const QuestionStatusTypography = ({
  status: QuestionStatus,
  ...props
}: QuesitonStatusTypographyProps) => {
  return <Typography {...props} />;
};
