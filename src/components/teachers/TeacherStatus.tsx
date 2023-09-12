import { Typography, TypographyProps } from "@mui/material";

import { TeacherStatus } from "../../dto/enum/teacher-status.enum";

type TeacherStatusProps = TypographyProps & {
  status: TeacherStatus;
};

const statusDescription = (status: TeacherStatus) => {
  if (status === TeacherStatus.ACTIVE) {
    return "質問回答受付中";
  } else {
    return "質問回答拒否中";
  }
};

export const TeacherStatusTypography = ({
  status,
  ...props
}: TeacherStatusProps) => {
  return <Typography {...props}>{statusDescription(status)}</Typography>;
};
