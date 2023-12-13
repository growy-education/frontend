import { Chip, ChipProps } from "@mui/material";
import {
  Subject,
  getSubjectColor,
  getSubjectText,
} from "../../../domains/subject.enum";

type SubjectChipProps = {
  subject: Subject;
} & Omit<ChipProps, "title">;

export const SubjectChip = ({ subject, ...props }: SubjectChipProps) => {
  return (
    <Chip
      title={getSubjectText(subject)}
      variant="outlined"
      {...props}
      sx={{
        color: getSubjectColor(subject),
        ...props.sx,
      }}
    />
  );
};
