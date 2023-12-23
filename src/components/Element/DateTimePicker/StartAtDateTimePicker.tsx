import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Control, Controller, FieldErrors } from "react-hook-form";

type StartAtDateTimePickerProps = {
  control: Control<any>;
  errors: FieldErrors<{ startAt: Dayjs }>;
};

export const StartAtDateTimePicker = ({
  control,
  errors,
}: StartAtDateTimePickerProps) => {
  return (
    <Controller
      name="startAt"
      control={control}
      render={({ field }) => (
        <DateTimePicker
          {...field}
          label="開始時刻"
          ampm={false}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              error: !!errors.startAt,
              helperText: !!errors.startAt && errors.startAt.message,
            },
          }}
        />
      )}
    />
  );
};
