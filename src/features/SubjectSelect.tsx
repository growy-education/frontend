import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { FC, forwardRef } from "react";
import { Subject } from "../domains/subject.enum";
import { FieldErrors } from "react-hook-form";
import { SubjectTypography } from "./SubjectTypography";

type SubjectSelectProps = {
  subjects: Subject[];
  errors: FieldErrors<{ subject: Subject }>;
} & SelectProps;

export const SubjectSelect: FC<SubjectSelectProps> = forwardRef(
  ({ subjects, errors, ...props }, ref) => {
    return (
      <FormControl fullWidth>
        <InputLabel id="subject-input-label">科目</InputLabel>
        <Select
          fullWidth
          id="subject-input"
          label="科目"
          labelId="subject-input-label"
          error={!!errors.subject}
          ref={ref}
          {...props}
        >
          {subjects.map((subject) => (
            <MenuItem key={subject} value={subject}>
              <SubjectTypography subject={subject} />
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {errors.subject ? errors.subject.message : "科目を選択してください"}
        </FormHelperText>
      </FormControl>
    );
  }
);
