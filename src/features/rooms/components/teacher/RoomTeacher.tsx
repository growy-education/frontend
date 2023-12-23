import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, BoxProps, Typography } from "@mui/material";
import { Room } from "../../types/room.class";
import { UpdateRoomDto } from "../../types/update-room.dto";
import { useUpdateRoom } from "../../api/updateRoom";
import { HeadlineTypography } from "../../../../components/Element/Typography/HeadlineTypography";
import { RolesGuard } from "../../../../tools/RolesGuard";
import { EditIconButton } from "../../../../components/Element/IconButton/EditIconButton";
import { Role } from "../../../users/types/role.enum";
import { TeacherSelect } from "../../../teachers/components/TeacherSelect";
import { TeacherChip } from "../../../teachers/components/TeacherChip";
import { useNavigate } from "react-router-dom";

type RoomTeacherProps = {
  room: Room;
} & BoxProps<"form">;

export const RoomTeacher = ({ room, ...props }: RoomTeacherProps) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateRoomDto>({
    resolver: classValidatorResolver(UpdateRoomDto),
    defaultValues: {
      teacher: room?.teacher,
    },
  });

  const mutation = useUpdateRoom({
    options: {
      onSettled: () => setIsEditing(false),
    },
  });

  const handleConfirm: SubmitHandler<UpdateRoomDto> = async (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: room.id, dto: data });
  };

  if (room?.teacher === undefined) {
    return <></>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleConfirm)} {...props}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <HeadlineTypography>担当講師</HeadlineTypography>
        <RolesGuard roles={[Role.ADMIN]}>
          <Box>
            <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
          </Box>
        </RolesGuard>
      </Box>
      <Box>
        {isEditing ? (
          <TeacherSelect control={control} errors={errors} />
        ) : room?.teacher ? (
          <TeacherChip
            teacher={room.teacher}
            onClick={() => navigate(`/teachers/${room?.teacher.id}`)}
          />
        ) : (
          <Typography>講師が選択されていません</Typography>
        )}
      </Box>
    </Box>
  );
};
