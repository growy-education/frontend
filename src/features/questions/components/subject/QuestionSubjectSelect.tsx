import { FieldErrors } from "react-hook-form";
import { Subject } from "../../../../domains/subject.enum";
import { SubjectSelect } from "../../../SubjectSelect";
import { SelectProps } from "@mui/material";

type QuestionSubjectSelectProps = {
  errors: FieldErrors<{ subject: Subject }>;
} & SelectProps;

export const QuestionSubjectSelect = (props: QuestionSubjectSelectProps) => {
  return (
    <SubjectSelect
      subjects={[Subject.MATHEMATICS, Subject.SCIENCE]}
      {...props}
    />
  );
};
