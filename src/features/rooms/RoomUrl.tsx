import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateRoomDto } from "./types/update-room.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Room } from "./types/room.class";
import { useUpdateRoom } from "./api/updateRoom";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../components/Element/IconButton/EditIconButton";
import { GoogleMeetURL } from "../../components/shared/GoogleMeetURL";
import { UrlTextField } from "../../components/Element/TextField/UrlTextField";
import { RolesGuard } from "../../tools/RolesGuard";
import { Role } from "../users/types/role.enum";

type RoomUrlProps = {
  room: Room;
} & BoxProps<"form">;

export const RoomUrl = ({ room, ...props }: RoomUrlProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateRoomDto>({
    resolver: classValidatorResolver(UpdateRoomDto),
    defaultValues: {
      url: room.url,
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

  if (!!!room?.url) {
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
        <HeadlineTypography>GoogleMeet URL</HeadlineTypography>
        <RolesGuard roles={[Role.ADMIN]}>
          <Box>
            <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
          </Box>
        </RolesGuard>
      </Box>
      <Box>
        {isEditing ? (
          <UrlTextField errors={errors} {...register("url")} />
        ) : (
          <GoogleMeetURL url={room.url} />
        )}
      </Box>
    </Box>
  );
};
