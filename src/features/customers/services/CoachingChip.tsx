import { Chip, ChipProps } from "@mui/material";
import { Group } from "@mui/icons-material";

export const CoachingChip = (props: ChipProps) => {
  return <Chip label="コーチング" icon={<Group />} {...props} />;
};
