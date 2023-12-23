import { DateTimePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { Control, Controller, FieldErrors } from "react-hook-form";

type EndAtDateTimePickerProps = {
  control: Control<any>;
  errors: FieldErrors<{ endAt: Dayjs }>;
};

export const EndAtDateTimePicker = ({
  control,
  errors,
}: EndAtDateTimePickerProps) => {
  return (
    <Controller
      name="endAt"
      control={control}
      render={({ field }) => (
        <DateTimePicker
          {...field}
          label="終了時刻"
          ampm={false}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              error: !!errors.endAt,
              helperText: !!errors.endAt && errors.endAt.message,
            },
          }}
        />
      )}
    />
  );
};
