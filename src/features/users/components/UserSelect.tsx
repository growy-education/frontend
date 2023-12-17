import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";

import { FieldErrors } from "react-hook-form";
import { LoadingBox } from "../../LoadingData";
import { useUsers } from "../api/getUsers";
import { AlertBox } from "../../AlertBox";

type UserSelectProps = {
  errors: FieldErrors<{ userId: string }>;
} & SelectProps;

export const UserSelect = ({ errors, ...props }: UserSelectProps) => {
  const { isLoading, isError, data: users } = useUsers();

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
      <Select required fullWidth id="userId" {...props}>
        {users?.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.email + "  "}
            {!!user?.student && "生徒名："}
            {user?.student?.lastName}
            {user?.student?.firstName}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!errors.userId}>
        {errors.userId ? errors.userId.message : "講師を選択してください"}
      </FormHelperText>
    </FormControl>
  );
};
