import { Box, BoxProps, Switch, Typography } from "@mui/material";
import { Teacher } from "./types/teacher.class";
import { TeacherStatus } from "./types/teacher-status.enum";
import { useContext } from "react";
import { Role } from "../users/types/role.enum";
import { useUpdateTeacher } from "./api/updateTeacher";
import { AuthContext } from "../../providers/auth.provider";

type TeacherStatusSwitchProps = {
  teacher: Teacher;
} & BoxProps;

export const TeacherStatusSwitch = ({
  teacher,
  ...props
}: TeacherStatusSwitchProps) => {
  const { user } = useContext(AuthContext);
  const mutation = useUpdateTeacher();

  const handleClick = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({
      id: "me",
      dto: {
        status:
          user.teacher?.status === TeacherStatus.ACTIVE
            ? TeacherStatus.INACTIVE
            : TeacherStatus.ACTIVE,
      },
    });
  };

  if (user.role !== Role.TEACHER) {
    return;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 0.5,
      }}
    >
      <Typography component="div" sx={{ marginRight: 0.5 }}>
        質問回答
      </Typography>
      <Typography component="div" color="error.main">
        off
      </Typography>
      <Switch
        disabled={mutation.isPending}
        checked={teacher.status === TeacherStatus.ACTIVE}
        onChange={handleClick}
        color={
          teacher.status === TeacherStatus.ACTIVE ? "secondary" : "default"
        }
      />
      <Typography component="div" color="secondary.main">
        on
      </Typography>
    </Box>
  );
};
