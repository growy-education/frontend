import { Chip, ChipProps } from "@mui/material";
import { Laptop } from "@mui/icons-material";

export const RoomChip = (props: ChipProps) => {
  return (
    <Chip
      variant="outlined"
      label="オンライン自習室"
      icon={<Laptop />}
      {...props}
    />
  );
};
