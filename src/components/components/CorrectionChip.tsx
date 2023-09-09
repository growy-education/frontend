import { Chip, ChipProps } from "@mui/material";
import { ChecklistRtl } from "@mui/icons-material";

export const CorrectionChip = (props: ChipProps) => {
  return (
    <Chip label="過去問・模試動画添削" icon={<ChecklistRtl />} {...props} />
  );
};
