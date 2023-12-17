import { Control, Controller, FieldErrors } from "react-hook-form";
import { Subject, getSubjectText } from "../../../domains/subject.enum";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";

type SubjectCheckboxesProps = {
  errors: FieldErrors<{ subjects: Subject[] }>;
  control: Control<any>;
};

export const SubjectsCheckboxes = ({
  errors,
  control,
}: SubjectCheckboxesProps) => {
  return (
    <Controller
      name="subjects"
      control={control}
      defaultValue={[]}
      render={({ field: props }) => (
        <>
          {[
            Subject.JAPANESE,
            Subject.MATHEMATICS,
            Subject.SCIENCE,
            Subject.SOCIALSTUDIES,
          ].map((subject) => (
            <FormControlLabel
              label={getSubjectText(subject)}
              control={
                <Checkbox
                  {...props}
                  key={subject}
                  checked={props.value.includes(subject)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      return props.onChange([...props.value, subject]);
                    } else {
                      return props.onChange(
                        props.value.filter((removed) => removed !== subject)
                      );
                    }
                  }}
                />
              }
            />
          ))}
          <FormHelperText error={!!errors.subjects}>
            {errors.subjects?.message}
          </FormHelperText>
        </>
      )}
    />
  );
};
