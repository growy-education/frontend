import { Control, Controller, FieldErrors } from "react-hook-form";
import { TeacherStatus } from "./types/teacher-status.enum";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

type TeacherStatusRadioGroupProps = {
  errors: FieldErrors<{ status: TeacherStatus }>;
  control: Control<any>;
};

export const TeacherStatusRadioGroup = ({
  errors,
  control,
}: TeacherStatusRadioGroupProps) => {
  return (
    <Controller
      name="status"
      control={control}
      render={({ field }) => (
        <RadioGroup
          row
          name="radio-buttons-group-teacher-status"
          sx={{ justifyContent: "center" }}
          {...field}
        >
          <FormControlLabel
            value={TeacherStatus.ACTIVE}
            control={<Radio />}
            label="受付中"
          />
          <FormControlLabel
            value={TeacherStatus.INACTIVE}
            control={<Radio />}
            color="error"
            label="拒否中"
          />
        </RadioGroup>
      )}
    />
  );
};
