import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

import { LoadingBox } from "../../../LoadingData";
import { AlertBox } from "../../../AlertBox";
import { FieldErrors } from "react-hook-form";
import { useTeachers } from "../../../teachers/api/getTeachers";

type TeacherSelectProps = {
  errors: FieldErrors<{ teacherId: string }>;
} & SelectProps;

export const TeacherSelect = ({ errors, ...props }: TeacherSelectProps) => {
  const { isLoading, isError, data: teachers } = useTeachers();

  if (isLoading) {
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
      <Select required fullWidth id="teacherId" {...props}>
        {teachers?.map((teacher) => (
          <MenuItem key={teacher.id} value={teacher.id}>
            {teacher.lastName} {teacher.firstName}
            {teacher?.user?.email}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!errors.teacherId}>
        {errors.teacherId ? errors.teacherId.message : "講師を選択してください"}
      </FormHelperText>
    </FormControl>
  );
};
