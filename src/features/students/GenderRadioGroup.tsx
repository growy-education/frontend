import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Gender } from "./types/gender.enum";

type GenderRadioGroupProps = {
  errors: FieldErrors<{ gender: Gender }>;
  control: Control<any>;
};

export const GenderRadioGroup = ({
  errors,
  control,
}: GenderRadioGroupProps) => {
  return (
    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <>
          <RadioGroup row name="radio-buttons-group" {...field}>
            <FormControlLabel
              value={Gender.MALE}
              control={<Radio />}
              label="男の子"
            />
            <FormControlLabel
              value={Gender.FEMALE}
              control={<Radio />}
              label="女の子"
            />
            <FormControlLabel
              value={Gender.OTHER}
              control={<Radio />}
              label="その他"
            />
          </RadioGroup>
          <FormHelperText error={!!errors.gender}>
            {errors.gender.message}
          </FormHelperText>
        </>
      )}
    />
  );
};
