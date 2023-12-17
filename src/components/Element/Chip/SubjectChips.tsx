import { Box, BoxProps, Typography } from "@mui/material";
import { Subject } from "../../../domains/subject.enum";
import { SubjectChip } from "./SubjectChip";

type SubjectChipsProps = {
  subjects: Subject[];
} & BoxProps;

export const SubjectChips = ({ subjects, ...props }: SubjectChipsProps) => {
  if (!Array.isArray(subjects)) {
    return <></>;
  }

  return (
    <Box {...props}>
      {subjects.length === 0 && (
        <Typography>担当科目が設定されていません。</Typography>
      )}
      {subjects.map((subject) => {
        return (
          <Box mx={0.5} display="inline-flex">
            <SubjectChip subject={subject} />
          </Box>
        );
      })}
    </Box>
  );
};
