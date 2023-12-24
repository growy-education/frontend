import { useState } from "react";
import { StudentChip } from "../../../students/StudentChip";
import { Room } from "../../types/room.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateRoomDto } from "../../types/update-room.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useUpdateRoom } from "../../api/updateRoom";
import { Box, BoxProps, Typography } from "@mui/material";
import { HeadlineTypography } from "../../../../components/Element/Typography/HeadlineTypography";
import { RolesGuard } from "../../../../tools/RolesGuard";
import { Role } from "../../../users/types/role.enum";
import { EditIconButton } from "../../../../components/Element/IconButton/EditIconButton";
import { StudentSelectAdd } from "../../../students/StudentSelectAdd";

type RoomStudentsProps = {
  room: Room;
} & BoxProps<"form">;

export const RoomStudents = ({ room, ...props }: RoomStudentsProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
    watch,
  } = useForm<UpdateRoomDto>({
    resolver: classValidatorResolver(UpdateRoomDto),
    defaultValues: {
      students: room?.students,
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

  const handleDelete = (id: string) => {
    const students = getValues("students");
    setValue(
      "students",
      students.filter((student) => id !== student.id)
    );
  };

  watch("students");

  if (!Array.isArray(room?.students)) {
    return <></>;
  }

  return (
    <RolesGuard roles={[Role.ADMIN, Role.TEACHER]}>
      <Box component="form" onSubmit={handleSubmit(handleConfirm)} {...props}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <HeadlineTypography>参加する生徒</HeadlineTypography>
          <RolesGuard roles={[Role.ADMIN]}>
            <Box>
              <EditIconButton
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </Box>
          </RolesGuard>
        </Box>
        <Box>
          {isEditing ? (
            <>
              {getValues("students")?.map((student) => (
                <StudentChip
                  key={"editing-" + student.id}
                  student={student}
                  sx={{ mx: 0.5, mb: 1 }}
                  onDelete={() => handleDelete(student.id)}
                />
              ))}
              <StudentSelectAdd
                addedStudents={getValues("students")}
                control={control}
              />
            </>
          ) : (
            <>
              {room?.students?.length === 0 && (
                <Typography>参加する生徒がいません</Typography>
              )}
              {room.students.map((student) => (
                <StudentChip
                  key={student.id}
                  student={student}
                  sx={{ mx: 0.5, mb: 1 }}
                />
              ))}
            </>
          )}
        </Box>
      </Box>
    </RolesGuard>
  );
};
