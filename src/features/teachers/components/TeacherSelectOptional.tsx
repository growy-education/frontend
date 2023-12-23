import { FormControl, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useTeachers } from "../api/getTeachers";
import { LoadingBox } from "../../LoadingData";
import { AlertBox } from "../../AlertBox";
import { CreateRoomDto } from "../../rooms/types/create-room.dto";

type TeacherSelectOptionalProps = {
  control: Control<CreateRoomDto>;
};

export const TeacherSelectOptional = ({
  control,
}: TeacherSelectOptionalProps) => {
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
      <Controller
        name="teacher"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            fullWidth
            labelId="teacher-select-label"
            displayEmpty
            onChange={(e) =>
              field.onChange(
                teachers.find((teacher) => teacher.id === e.target.value)
              )
            }
          >
            <MenuItem value={""}>指定なし</MenuItem>
            {teachers.map((teacher) => (
              <MenuItem key={teacher.id} value={teacher.id}>
                {teacher.lastName + teacher.firstName}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};
