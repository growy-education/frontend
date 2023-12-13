import {
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Relationship } from "./types/relationship.enum";

type RelationshipRadioGroupProps = {
  errors: FieldErrors<{ relationship: string }>;
  control: Control<any>;
};

export const RelationshipRadioGroup = ({
  errors,
  control,
}: RelationshipRadioGroupProps) => {
  return (
    <Controller
      name="relationship"
      control={control}
      render={({ field }) => (
        <RadioGroup row name="radio-buttons-group" {...field}>
          <FormControlLabel
            value={Relationship.FATHER}
            control={<Radio />}
            label="父親"
          />
          <FormControlLabel
            value={Relationship.MOTHER}
            control={<Radio />}
            label="母親"
          />
          <FormControlLabel
            value={Relationship.OTHER}
            control={<Radio />}
            label="その他"
          />
          <FormHelperText error={!!errors.relationship}>
            {errors.relationship?.message}
          </FormHelperText>
        </RadioGroup>
      )}
    />
  );
};
