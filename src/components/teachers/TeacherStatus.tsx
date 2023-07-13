import { Typography, TypographyProps } from "@mui/material";

import { TeacherStatus } from "../../dto/enum/teacher-status.enum";

type TeacherStatusProps = TypographyProps & {
  status: TeacherStatus;
};

const statusDescription = (status: TeacherStatus) => {
  if (status === TeacherStatus.ACTIVE) {
    return "活動中";
  } else {
    return "休止中";
  }
};

export const TeacherStatusTypography = ({
  status,
  ...props
}: TeacherStatusProps) => {
  return <Typography {...props}>{statusDescription(status)}</Typography>;
};
