import {
  Box,
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
import { Relationship } from "./types/relationship.enum";

type RelationshipRadioGroupProps = {
  error: FieldError;
  control: Control<any>;
} & Partial<Omit<ControllerProps, "control">>;

export const RelationshipRadioGroup = ({
  error,
  control,
  ...props
}: RelationshipRadioGroupProps) => {
  return (
    <Controller
      name="relationship"
      control={control}
      render={({ field }) => (
        <RadioGroup
          row
          name="radio-buttons-group"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          {...field}
        >
          <Box sx={{ display: "flex" }}>
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
          </Box>
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </RadioGroup>
      )}
      {...props}
    />
  );
};
