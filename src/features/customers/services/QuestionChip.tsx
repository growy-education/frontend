import { Chip, ChipProps } from "@mui/material";
import { LiveHelp } from "@mui/icons-material";

export const QuestionChip = (props: ChipProps) => {
  return <Chip label="質問回答" icon={<LiveHelp />} {...props} />;
};
