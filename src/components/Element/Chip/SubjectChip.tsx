import { Chip, ChipProps } from "@mui/material";
import {
  Subject,
  getSubjectColor,
  getSubjectText,
} from "../../../domains/subject.enum";

type SubjectChipProps = {
  subject: Subject;
} & Omit<ChipProps, "label">;

export const SubjectChip = ({ subject, ...props }: SubjectChipProps) => {
  return (
    <Chip
      label={getSubjectText(subject)}
      variant="outlined"
      {...props}
      sx={{
        color: getSubjectColor(subject),
        fontWeight: "bold",
        borderColor: getSubjectColor(subject),
        ...props.sx,
      }}
    />
  );
};
