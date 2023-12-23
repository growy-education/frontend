import { Chip, ChipProps } from "@mui/material";
import { Teacher } from "../types/teacher.class";

type TeacherChipProps = {
  teacher: Teacher;
} & ChipProps;

export const TeacherChip = ({ teacher, ...props }: TeacherChipProps) => {
  return <Chip label={teacher.lastName + teacher.firstName} {...props} />;
};
