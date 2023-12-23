import { useState } from "react";
import { Box, BoxProps } from "@mui/material";

import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { Room } from "../../types/room.class";
import { UpdateRoomDto } from "../../types/update-room.dto";
import { useUpdateRoom } from "../../api/updateRoom";
import { HeadlineTypography } from "../../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../../components/Element/IconButton/EditIconButton";
import { JaDateTimeTypography } from "../../../../components/Element/Typography/JaDateTimeTypography";
import dayjs from "dayjs";
import { StartAtDateTimePicker } from "../../../../components/Element/DateTimePicker/StartAtDateTimePicker";
import { RolesGuard } from "../../../../tools/RolesGuard";
import { Role } from "../../../users/types/role.enum";

type RoomStartAtProps = {
  room: Room;
} & BoxProps<"form">;

export const RoomStartAt = ({ room, ...props }: RoomStartAtProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateRoomDto>({
    resolver: classValidatorResolver(UpdateRoomDto),
    defaultValues: {
      startAt: dayjs(room?.startAt),
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

  if (!(room?.startAt instanceof Date)) {
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
        <HeadlineTypography>開始時刻</HeadlineTypography>
        <RolesGuard roles={[Role.ADMIN]}>
          <Box>
            <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
          </Box>
        </RolesGuard>
      </Box>
      <Box>
        {isEditing ? (
          <StartAtDateTimePicker control={control} errors={errors} />
        ) : (
          <JaDateTimeTypography date={room.startAt} />
        )}
      </Box>
    </Box>
  );
};
