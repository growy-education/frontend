import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { useTeachers } from "../api/getTeachers";
import { LoadingBox } from "../../LoadingData";
import { AlertBox } from "../../AlertBox";
import { Teacher } from "../types/teacher.class";

type TeacherSelectProps = {
  control: Control<any>;
  errors: FieldErrors<{ teacher: Teacher }>;
};

export const TeacherSelect = ({ control, errors }: TeacherSelectProps) => {
  const { isPending, isError, data: teachers } = useTeachers();

  if (isPending) {
    return <LoadingBox message="講師を取得中..." />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラーが発生しました"
        description="講師リストが取得できませんでした。ネットワーク状態を確認してください。"
      />
    );
  }

  return (
    <FormControl fullWidth>
      <Controller
        name="teacher"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            fullWidth
            labelId="teacher-select-label"
            value={field?.value?.id}
            onChange={(e) =>
              field.onChange(
                teachers.find((teacher) => teacher.id === e.target.value)
              )
            }
          >
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.lastName + teacher.firstName}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText error={!!errors.teacher}>
        {errors.teacher ? errors.teacher.message : "講師を選択してください"}
      </FormHelperText>
    </FormControl>
  );
};
