import { FormControl, MenuItem, Select } from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { useStudents } from "./api/getStudents";
import { Student } from "./types/student.class";
import { LoadingBox } from "../LoadingData";
import { AlertBox } from "../AlertBox";

type StudentSelectAddProps = {
  addedStudents: Student[];
  control: Control<any>;
};

export const StudentSelectAdd = ({
  addedStudents,
  control,
}: StudentSelectAddProps) => {
  const { isLoading, isError, data: students } = useStudents();

  if (isLoading) {
    return <LoadingBox message="生徒を取得中..." />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラーが発生しました"
        description="生徒リストが取得できませんでした。ネットワーク状態を確認してください。"
      />
    );
  }
  return (
    <FormControl fullWidth>
      <Controller
        name="students"
        control={control}
        render={({ field }) => (
          <>
            <Select
              {...field}
              labelId="students-select-label"
              renderValue={(students) => {
                return <em>生徒を追加する</em>;
              }}
              onChange={(e) => {
                const selected = students.find(
                  (student) => student.id === e.target.value
                );
                field.onChange([...addedStudents, selected]);
              }}
            >
              {students
                .filter((student) => !addedStudents.includes(student))
                .map((student) => (
                  <MenuItem key={student.id} value={student.id}>
                    {student.lastName + " " + student.firstName}
                  </MenuItem>
                ))}
            </Select>
          </>
        )}
      />
    </FormControl>
  );
};
