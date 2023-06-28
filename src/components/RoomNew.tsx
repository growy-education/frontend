import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Type, plainToInstance } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axios, { isAxiosError } from "axios";
import SendIcon from "@mui/icons-material/Send";

import { useAxiosConfig } from "../contexts/AxiosContextProvider";
import { Box, Button, MenuItem, Select, Typography } from "@mui/material";
import { Title } from "./QuestionTitle";
import { Teacher } from "../types/teacher.class";

class CreateRoomDto {
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: "開始時刻を入力してください" })
  startAt: dayjs.Dayjs;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate({ message: "終了時刻を入力してください" })
  endAt: dayjs.Dayjs;

  @IsNotEmpty({ message: "講師を選択してください" })
  @IsString()
  teacherId: string;
}

export const mockTeachers = [
  {
    id: "1",
    firstName: "友伸",
    lastName: "桶谷",
  },
  {
    id: "2",
    firstName: "宏輝",
    lastName: "竹熊",
  },
] as Teacher[];

export const RoomNew = () => {
  const { axiosConfig } = useAxiosConfig();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("/teachers")
      .then((response) => {
        const teachers = response.data.map((teacherJson) =>
          plainToInstance(Teacher, teacherJson)
        );
        setTeachers(teachers);
      })
      .catch((error) => console.log(`error occured at ${__dirname}, ${error}`));
  }, [axiosConfig]);

  const resolver = classValidatorResolver(CreateRoomDto);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateRoomDto>({
    resolver,
    defaultValues: {
      startAt: dayjs(new Date(searchParams.get("startAt")))
        .hour(17)
        .minute(0)
        .second(0)
        .millisecond(0),
      endAt: dayjs(new Date(searchParams.get("endAt")))
        .hour(19)
        .minute(0)
        .second(0)
        .millisecond(0),
      teacherId: "",
    },
  });

  // 結果を示すオブジェクトを作成する
  const [result, setResult] = useState({
    open: false,
    success: false,
    title: "",
    message: "",
  });

  const onSubmit: SubmitHandler<CreateRoomDto> = (data) => {
    console.log("動いた！");
    console.log(data);
    console.log(data.startAt.toString());
    console.log(data.endAt.toString());

    // axios
    //   .create(axiosConfig)
    //   .post("rooms", {})
    //   .then((response) => {
    //     setResult({
    //       open: true,
    //       success: true,
    //       title: "オンライン自習室の作成が完了しました",
    //       message: "オンライン自習室の一覧画面へ遷移しますか？",
    //     });
    //   })
    //   .catch((error: unknown) => {
    //     if (isAxiosError(error)) {
    //       // サーバーからの返答がある
    //       if (error.response) {
    //         return setResult({
    //           open: true,
    //           success: false,
    //           title: "",
    //           message: "ユーザーのデータに誤りがあります",
    //         });
    //       }
    //       // サーバーからの返答がない
    //       if (error.request) {
    //         return setResult({
    //           open: true,
    //           success: false,
    //           title: "",
    //           message:
    //             "サーバーからの返答がありません。ネットワーク接続を確認してください",
    //         });
    //       }
    //     }

    //     // よくわからんエラーのとき
    //     return setResult({
    //       open: true,
    //       success: false,
    //       title: "",
    //       message: "予期せぬエラーが発生しました",
    //     });
    //   });
  };

  // ダイアログの確認ボタンを押すと、オンライン自習室の一覧画面へと遷移する
  const handleConfirm = () => {
    setResult({ open: false, success: false, title: "", message: "" });
    navigate("/rooms"); // 詳細画面への遷移
  };

  const handleCancel = () => {
    setResult({ open: false, success: false, title: "", message: "" });
  };

  // スイッチが変更されたら、時刻を調節する
  const handleSwitchChange = (event: any) => {
    const value = event.target.value;
    if (value === "weekday") {
      setValue("startAt", getValues("startAt").hour(17).minute(0));
      setValue("endAt", getValues("endAt").hour(19).minute(0));
    }
    if (value === "holiday") {
      setValue("startAt", getValues("startAt").hour(10).minute(0));
      setValue("endAt", getValues("endAt").hour(12).minute(0));
    }
  };

  return (
    <>
      <Typography variant="h4">オンライン自習室を新規作成する</Typography>
      <Title title="時間帯" />
      <Select fullWidth defaultValue="weekday" onChange={handleSwitchChange}>
        <MenuItem key="weekday" value="weekday">
          平日（17:00〜19:00）
        </MenuItem>
        <MenuItem key="holiday" value="holiday">
          休日（10:00〜12:00）
        </MenuItem>
      </Select>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Title title="開始時刻" />
        <Controller
          name="startAt"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              label="開始時刻"
              ampm={false}
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

        <Title title="終了時刻" />
        <Controller
          name="endAt"
          control={control}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              label="終了時刻"
              ampm={false}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  error: !!errors.endAt,
                  helperText: !!errors.endAt && errors.endAt.message,
                },
              }}
            />
          )}
        />

        <Title title="講師を選択する" />
        <Select
          required
          fullWidth
          id="teacherId"
          defaultValue=""
          error={!!errors.teacherId}
          {...register("teacherId")}
        >
          {mockTeachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.lastName + teacher.firstName}
            </MenuItem>
          ))}
        </Select>
        <Box margin="0.5em">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
          >
            送信
          </Button>
        </Box>
      </Box>
    </>
  );
};
