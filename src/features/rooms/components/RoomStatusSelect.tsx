import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";

import {
  RoomStatus,
  RoomStatuses,
  getRoomStatusText,
} from "../types/room-status.enum";

type RoomStatusSelectProps = {
  control: Control<any>;
  errors: FieldErrors<{ status: RoomStatus }>;
} & SelectProps;

export const RoomStatusSelect = ({
  control,
  errors,
}: RoomStatusSelectProps) => {
  return (
    <FormControl fullWidth>
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            fullWidth
            required
            onChange={(e) => field.onChange(e.target.value)}
          >
            {RoomStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {getRoomStatusText(status)}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText error={!!errors.status}>
        {errors.status ? errors.status.message : "ステータスを選択してください"}
      </FormHelperText>
    </FormControl>
  );
};
