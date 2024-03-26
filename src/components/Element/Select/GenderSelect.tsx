import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { Control, Controller, FieldError } from "react-hook-form";
import { Gender } from "../../../features/students/types/gender.enum";

type GenderSelectProps = {
  name: string;
  control: Control<any>;
  error: FieldError;
};

export const GenderSelect = ({ name, control, error }: GenderSelectProps) => {
  return (
    <>
      <Controller
        name={name} // Controllerに対してフィールド名を指定
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select {...field} required fullWidth error={!!error} id="role">
            <MenuItem key={Gender.MALE} value={Gender.MALE}>
              男子
            </MenuItem>
            <MenuItem key={Gender.FEMALE} value={Gender.FEMALE}>
              女子
            </MenuItem>
            <MenuItem key={Gender.OTHER} value={Gender.OTHER}>
              その他
            </MenuItem>
          </Select>
        )}
      />
      <FormHelperText error={!!error}>
        {typeof error?.message === "string"
          ? error.message
          : "性別を選択してください"}
      </FormHelperText>
    </>
  );
};
