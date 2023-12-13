import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Typography,
} from "@mui/material";
import { FieldErrors } from "react-hook-form";
import { useUsers } from "./api/getUsers";
import { LoadingBox } from "../LoadingData";
import { AlertBox } from "../AlertBox";
import { GetUsersFilterDto } from "./types/get-user-filter.dto";

type UserSelectProps = {
  errors: FieldErrors<{ userId: string }>;
  filterDto?: GetUsersFilterDto;
} & SelectProps;

export const UserSelect = ({
  errors,
  filterDto,
  ...props
}: UserSelectProps) => {
  const { isLoading, isError, data: users } = useUsers({ filterDto });

  if (isLoading) {
    return <LoadingBox message="ユーザーを取得中..." />;
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
      <Select required fullWidth id="userId" error={!!errors.userId} {...props}>
        {users?.length === 0 && (
          <Typography textAlign="center">
            連携できるユーザーがいません
          </Typography>
        )}
        {users?.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.email}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error={!!errors.userId}>
        {errors.userId ? errors.userId.message : "ユーザーを選択してください"}
      </FormHelperText>
    </FormControl>
  );
};
