import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
} from "react-hook-form";
import { Gender } from "./types/gender.enum";

type GenderRadioGroupProps = {
  error: FieldError;
  control: Control<any>;
} & Partial<Omit<ControllerProps, "control">>;

export const GenderRadioGroup = ({
  error,
  control,
  ...props
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
              label="男子"
            />
            <FormControlLabel
              value={Gender.FEMALE}
              control={<Radio />}
              label="女子"
            />
            <FormControlLabel
              value={Gender.OTHER}
              control={<Radio />}
              label="その他"
            />
          </RadioGroup>
          <FormHelperText error={!!error}>
            {typeof error?.message === "string"
              ? error.message
              : "性別を入力してください"}
          </FormHelperText>
        </>
      )}
      {...props}
    />
  );
};
