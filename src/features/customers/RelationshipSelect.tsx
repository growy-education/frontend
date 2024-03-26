import { FormHelperText, MenuItem, Select } from "@mui/material";
import { Control, Controller, FieldError } from "react-hook-form";
import { Relationship } from "./types/relationship.enum";

type RelationshipSelectProps = {
  name: string;
  control: Control<any>;
  error: FieldError;
};

export const RelationshipSelect = ({
  name,
  control,
  error,
}: RelationshipSelectProps) => {
  return (
    <>
      <Controller
        name={name} // Controllerに対してフィールド名を指定
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select {...field} required fullWidth error={!!error} id="role">
            <MenuItem key={Relationship.FATHER} value={Relationship.FATHER}>
              父親
            </MenuItem>
            <MenuItem key={Relationship.MOTHER} value={Relationship.MOTHER}>
              母親
            </MenuItem>
            <MenuItem key={Relationship.OTHER} value={Relationship.OTHER}>
              その他
            </MenuItem>
          </Select>
        )}
      />
      <FormHelperText error={!!error}>
        {typeof error?.message === "string"
          ? error.message
          : "続柄を選択してください"}
      </FormHelperText>
    </>
  );
};
