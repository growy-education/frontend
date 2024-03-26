import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Merge,
} from "react-hook-form";
import { Service } from "../users/types/service.enum";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

type ServicesCheckBoxes = {
  error: Merge<FieldError, FieldError[]>;
  control: Control<any>;
} & Partial<Omit<ControllerProps, "control">>;

const Services = [
  { id: Service.QUESTION_ANSWER, name: "質問回答" },
  { id: Service.SELF_STUDY_ROOM, name: "オンライン自習室" },
  { id: Service.TEST_CORRECTION, name: "模試・過去問添削" },
  { id: Service.TEACHING, name: "ティーチング" },
  { id: Service.COACHING, name: "コーチング" },
];

export const ServicesCheckboxes = ({
  error,
  control,
  ...props
}: ServicesCheckBoxes) => {
  return (
    <Controller
      name="services"
      control={control}
      defaultValue={[]}
      render={({ field: props }) => (
        <>
          {Services.map((item) => (
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
