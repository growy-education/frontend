import { Typography, TypographyProps } from "@mui/material";
import { Subject, getSubjectText } from "../domains/subject.enum";

type SubjectTypographyProps = {
  subject: Subject;
} & TypographyProps;

const getTextColor = (subject: Subject): string => {
  switch (subject) {
    case Subject.JAPANESE:
      return "red";
    case Subject.MATHEMATICS:
      return "blue";
    case Subject.SCIENCE:
      return "orange";
    case Subject.SOCIALSTUDIES:
      return "green";
  }
};

export const SubjectTypography = ({
  subject,
  ...props
}: SubjectTypographyProps) => {
  return (
    <Typography color={getTextColor(subject)} fontWeight="bold" {...props}>
      {getSubjectText(subject)}
    </Typography>
  );
};
