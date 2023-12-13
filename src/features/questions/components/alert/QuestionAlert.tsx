import { AlertProps } from "@mui/material";

import { Question } from "../../types/question.class";
import { Role } from "../../../users/types/role.enum";
import { RolesGuard } from "../../../../tools/RolesGuard";

import { AdminQuestionAlert } from "./AdminQuestionAlert";
import { TeacherQuestionAlert } from "./TeacherQuestionAlert";

type QuestionAlertProps = {
  question: Question;
} & AlertProps;

export const QuestionAlert = ({ question, ...props }: QuestionAlertProps) => {
  return (
    <>
      <RolesGuard roles={[Role.ADMIN]}>
        <AdminQuestionAlert question={question} {...props} />
      </RolesGuard>
      <RolesGuard roles={[Role.TEACHER]}>
        <TeacherQuestionAlert question={question} {...props} />
      </RolesGuard>
    </>
  );
};
