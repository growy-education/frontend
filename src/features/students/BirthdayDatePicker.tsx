import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Control, Controller, FieldErrors } from "react-hook-form";

type BirthdayDatePickerProps = {
  errors: FieldErrors<{ birthday: dayjs.Dayjs }>;
  control: Control<any>;
};

export const BirthdayDatePicker = ({
  errors,
  control,
}: BirthdayDatePickerProps) => {
  return (
    <Controller
      name="birthday"
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <DatePicker
          {...field}
          format="YYYY/MM/DD"
          label="誕生日"
          slotProps={{
            textField: {
              fullWidth: true,
              variant: "outlined",
              error: !!errors.birthday,
              helperText: !!errors.birthday && errors.birthday.message,
            },
          }}
        />
      )}
    />
  );
};
