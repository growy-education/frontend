import { useState } from "react";
import { Room } from "../types/room.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateRoomDto } from "../types/update-room.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useUpdateRoom } from "../api/updateRoom";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { RolesGuard } from "../../../tools/RolesGuard";
import { Role } from "../../users/types/role.enum";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { RoomStatusTypography } from "../RoomStatusTypography";
import { RoomStatusSelect } from "./RoomStatusSelect";

type RoomStatusProps = {
  room: Room;
} & BoxProps<"form">;

export const RoomStatus = ({ room, ...props }: RoomStatusProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateRoomDto>({
    resolver: classValidatorResolver(UpdateRoomDto),
    defaultValues: {
      status: room?.status,
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

  if (!!!room?.status) {
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
        <HeadlineTypography>ステータス</HeadlineTypography>
        <RolesGuard roles={[Role.ADMIN]}>
          <Box>
            <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
          </Box>
        </RolesGuard>
      </Box>
      <Box>
        {isEditing ? (
          <RoomStatusSelect control={control} errors={errors} />
        ) : (
          <RoomStatusTypography status={room.status} />
        )}
      </Box>
    </Box>
  );
};
