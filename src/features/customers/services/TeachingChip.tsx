import { Chip, ChipProps } from "@mui/material";
import { CastForEducation } from "@mui/icons-material";

export const TeachingChip = (props: ChipProps) => {
  return (
    <Chip
      variant="outlined"
      label="ティーチング"
      icon={<CastForEducation />}
      {...props}
    />
  );
};
