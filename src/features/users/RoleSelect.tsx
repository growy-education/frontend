import React, { FC } from "react";
import {
  Controller,
  useFormContext,
  FieldErrors,
  Control,
} from "react-hook-form";
import { Role } from "./types/role.enum";
import { FormHelperText, MenuItem, Select, Typography } from "@mui/material";

type RoleSelectProps = {
  roles: Role[];
  name: string;
  control: Control<any>;
  errors: FieldErrors<{ role: Role }>;
};

export const RoleSelect: FC<RoleSelectProps> = ({
  roles,
  name,
  errors,
  control,
}) => {
  return (
    <>
      <Controller
        name={name} // Controllerに対してフィールド名を指定
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select {...field} required fullWidth error={!!errors.role} id="role">
            {roles.length === 0 && (
              <Typography textAlign="center" color="error">
                選択可能なRoleがありません。
              </Typography>
            )}
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {role === Role.ADMIN && "管理者"}
                {role === Role.CUSTOMER && "顧客"}
                {role === Role.TEACHER && "講師"}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText error={!!errors.role}>
        {errors.role
          ? errors.role.message
          : "アカウントタイプを選択してください"}
      </FormHelperText>
    </>
  );
};
