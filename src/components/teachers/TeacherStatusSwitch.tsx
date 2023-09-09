import { Box, BoxProps, Switch, Typography } from "@mui/material";
import { Teacher } from "../../dto/teacher.class";
import { TeacherStatus } from "../../dto/enum/teacher-status.enum";
import { useCallback, useContext, useMemo, useState } from "react";
import { UserContext } from "../../contexts/UserContextProvider";
import { Role } from "../../dto/enum/role.enum";

type TeacherStatusSwitchProps = {
  teacher: Teacher;
} & BoxProps;

export const TeacherStatusSwitch = ({
  teacher,
  ...props
}: TeacherStatusSwitchProps) => {
  const { user, changeTeacherStatus } = useContext(UserContext);
  const [sending, setSending] = useState(false);

  const handleClick = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    changeTeacherStatus().finally(() => {
      setSending(false);
    });
  }, [sending, changeTeacherStatus]);

  if (user.role !== Role.TEACHER) {
    return;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 1,
      }}
    >
      <Typography
        component="div"
        color={
          teacher.status === TeacherStatus.ACTIVE ? "secondary" : "default"
        }
      >
        {teacher.status === TeacherStatus.ACTIVE ? "質問受付中" : "質問休止中"}
      </Typography>
      <Switch
        disabled={sending}
        checked={teacher.status === TeacherStatus.ACTIVE}
        onChange={handleClick}
        color={
          teacher.status === TeacherStatus.ACTIVE ? "secondary" : "default"
        }
      />
    </Box>
  );
};
