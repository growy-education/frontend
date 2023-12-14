import { FieldErrors } from "react-hook-form";
import { Subject } from "../../../../domains/subject.enum";
import { SubjectSelect } from "../../../SubjectSelect";
import { SelectProps } from "@mui/material";
import { FC, forwardRef } from "react";

type QuestionSubjectSelectProps = {
  errors: FieldErrors<{ subject: Subject }>;
} & SelectProps;

export const QuestionSubjectSelect: FC<QuestionSubjectSelectProps> = forwardRef(
  (props: QuestionSubjectSelectProps, ref) => {
    return (
      <SubjectSelect
        subjects={[Subject.MATHEMATICS, Subject.SCIENCE]}
        ref={ref}
        {...props}
      />
    );
  }
);
