import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from "react-hook-form";

type BirthdayDatePickerProps = {
  error: Merge<FieldError, FieldErrorsImpl<dayjs.Dayjs>>;
  control: Control<any>;
} & Partial<Omit<ControllerProps, "control">>;

export const BirthdayDatePicker = ({
  error,
  control,
  ...props
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
              error: !!error,
              helperText:
                typeof error?.message === "string"
                  ? error.message
                  : "誕生日を入力してください",
            },
          }}
        />
      )}
      {...props}
    />
  );
};
