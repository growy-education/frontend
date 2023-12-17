import { Typography, TypographyProps } from "@mui/material";

import { TeacherStatus } from "./types/teacher-status.enum";

type TeacherStatusProps = TypographyProps & {
  status: TeacherStatus;
};

const getStatusColor = (status: TeacherStatus) => {
  if (status === TeacherStatus.ACTIVE) {
    return "primary";
  } else {
    return "error";
  }
};

const getStatusString = (status: TeacherStatus) => {
  if (status === TeacherStatus.ACTIVE) {
    return "受付中";
  } else {
    return "拒否中";
  }
};

export const TeacherStatusTypography = ({
  status,
  ...props
}: TeacherStatusProps) => {
  return (
    <Typography fontWeight="bold" color={getStatusColor(status)} {...props}>
      {getStatusString(status)}
    </Typography>
  );
};
