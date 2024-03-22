import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Merge,
} from "react-hook-form";
import { CustomerService } from "./types/customer-service.enum";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

type CustomerServicesCheckBoxes = {
  error: Merge<FieldError, FieldError[]>;
  control: Control<any>;
} & Partial<Omit<ControllerProps, "control">>;

const CustomerServices = [
  { id: CustomerService.QUESTION_ANSWER, name: "質問回答" },
  { id: CustomerService.SELF_STUDY_ROOM, name: "オンライン自習室" },
  { id: CustomerService.TEST_CORRECTION, name: "模試・過去問添削" },
  { id: CustomerService.TEACHING, name: "ティーチング" },
  { id: CustomerService.COACHING, name: "コーチング" },
];

export const CustomerServicesCheckboxes = ({
  error,
  control,
  ...props
}: CustomerServicesCheckBoxes) => {
  return (
    <Controller
      name="services"
      control={control}
      defaultValue={[]}
      render={({ field: props }) => (
        <>
          {CustomerServices.map((item) => (
            <FormControlLabel
              key={item.id}
              label={item.name}
              control={
                <Checkbox
                  {...props}
                  key={item.id}
                  checked={props.value.includes(item.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      return props.onChange([...props.value, item.id]);
                    } else {
                      return props.onChange(
                        props.value.filter((removed) => removed !== item.id)
                      );
                    }
                  }}
                />
              }
            />
          ))}
          <FormHelperText error={!!error}>{error?.message}</FormHelperText>
        </>
      )}
      {...props}
    />
  );
};
