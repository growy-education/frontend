import { Chip, ChipProps } from "@mui/material";
import { Student } from "./types/student.class";

type StudentChipProps = {
  student: Student;
} & ChipProps;

export const StudentChip = ({ student, ...props }: StudentChipProps) => {
  return <Chip label={student.lastName + student.firstName} {...props} />;
};
