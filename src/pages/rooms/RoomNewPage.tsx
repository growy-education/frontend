import { useLocation, useNavigate } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import dayjs from "dayjs";

import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { CreateRoomDto } from "../../features/rooms/types/create-room.dto";
import { useCreateRoom } from "../../features/rooms/api/createRoom";
import { TeacherSelectOptional } from "../../features/teachers/components/TeacherSelectOptional";
import { ScheduleType } from "../../features/rooms/types/schedule-type.enum";
import { EndAtDateTimePicker } from "../../components/Element/DateTimePicker/EndAtDateTimePicker";
import { StartAtDateTimePicker } from "../../components/Element/DateTimePicker/StartAtDateTimePicker";
import { SubmitButton } from "../../features/SubmitButton";
import { Room } from "../../features/rooms/types/room.class";

export const RoomNewPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const resolver = classValidatorResolver(CreateRoomDto);
  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CreateRoomDto>({
    resolver,
    defaultValues: {
      scheduleType: ScheduleType.REGULAR,
      date: dayjs(state?.date instanceof Date ? state?.date : new Date()),
      teacher: undefined,
    },
  });

  const mutation = useCreateRoom({
    options: {
      onSettled: (room) => {
        if (room instanceof Room) {
          navigate(`/rooms/${room.id}`);
        }
      },
    },
  });

  const onSubmit: SubmitHandler<CreateRoomDto> = async (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(data);
  };

  watch("scheduleType");

  return (
    <>
      <PageTitleTypography>オンライン自習室を作成する</PageTitleTypography>
      <HeadlineTypography>スケジュール</HeadlineTypography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Select fullWidth {...register("scheduleType")}>
          <MenuItem key={ScheduleType.REGULAR} value={ScheduleType.REGULAR}>
            通常時刻（平日17~19時, 休日9~11時）
          </MenuItem>
          <MenuItem key={ScheduleType.SPECIAL} value={ScheduleType.SPECIAL}>
            特別時刻（任意指定）
          </MenuItem>
        </Select>

        {getValues("scheduleType") === ScheduleType.REGULAR ? (
          <>
            <HeadlineTypography>日付</HeadlineTypography>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label={"日付を選択する"}
                  views={["year", "month", "day"]}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: "outlined",
                      error: !!errors.startAt,
                      helperText: !!errors.startAt && errors.startAt.message,
                    },
                  }}
                />
              )}
            />
          </>
        ) : (
          <>
            <HeadlineTypography>開始時間</HeadlineTypography>
            <StartAtDateTimePicker control={control} errors={errors} />

            <HeadlineTypography>終了時刻</HeadlineTypography>
            <EndAtDateTimePicker control={control} errors={errors} />
          </>
        )}

        <HeadlineTypography>講師を選択する</HeadlineTypography>
        <TeacherSelectOptional control={control} />

        <Box m={1} mt={3}>
          <SubmitButton disabled={mutation.isPending}>
            {mutation.isPending ? "送信中..." : "送信する"}
          </SubmitButton>
        </Box>
      </Box>
    </>
  );
};
