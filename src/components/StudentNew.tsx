import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IsDate,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  Matches,
  MaxDate,
  MinDate,
} from "class-validator";
import { Type, plainToInstance } from "class-transformer";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AxiosContext } from "../contexts/AxiosContextProvider";
import { Title } from "./QuestionTitle";
import { Gender } from "../types/gender.enum";
import { User } from "../types/user.class";
import axios from "axios";
import { Role } from "../types/role.enum";

const getMinDate = (): Date => {
  const currentDate = new Date();
  const minDate = new Date(
    currentDate.getFullYear() - 13,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return minDate;
};

const getMaxDate = (): Date => {
  const currentDate = new Date();
  const maxDate = new Date(
    currentDate.getFullYear() - 9,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return maxDate;
};

class CreateStudentDto {
  @IsString()
  @IsNotEmpty({ message: "ユーザーを選択してください" })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: "お名前を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: "お名前（読み仮名）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  firstNameKana: string;

  @IsString()
  @IsNotEmpty({ message: "苗字を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: "苗字（読み仮名）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  lastNameKana: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsNotEmpty({ message: "小学校名を入力してください" })
  school: string;

  @IsString()
  @IsNotEmpty({ message: "塾名を入力してください" })
  juku: string;

  @IsString()
  @IsNotEmpty({ message: "塾の校舎名を入力してください" })
  jukuBuilding: string;

  @IsNotEmpty({ message: "学年を入力してください" })
  @IsIn(["4", "5", "6"], {
    message: "学年は半角英数字で入力してください",
  })
  grade: string;

  // format string to Date
  @Type(() => Date)
  @IsDate()
  @MaxDate(getMaxDate(), { message: "生年月日が新しすぎます" })
  @MinDate(getMinDate(), { message: "生年月日が古すぎます" })
  birthday: Date;
}

export const StudentNew = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const resolver = classValidatorResolver(CreateStudentDto);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateStudentDto>({
    resolver,
    defaultValues: { gender: Gender.MALE },
  });

  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("users", {
        params: {
          role: Role.PENDING,
        },
      })
      .then((response) => {
        const users = response.data.map((userJson: string) =>
          plainToInstance(User, userJson)
        );
        setUsers(users);
      })
      .catch((error) => console.log("error occurred at UsersList.tsx", error));
  }, [axiosConfig]);

  const onSubmit: SubmitHandler<CreateStudentDto> = (data) => {
    console.log(data);
    axios
      .create(axiosConfig)
      .post("students", {
        ...data,
      })
      .then((response) => {
        console.log(response.status);
        setOpen(true);
      })
      .catch((error) => console.log(error));
  };

  // 確認ダイアログ
  const [open, setOpen] = useState(false);
  // ダイアログの確認ボタンを押すと、ユーザーの一覧画面へと遷移する
  const handleConfirm = () => {
    setOpen(false);
    navigate("/students"); // 詳細画面への遷移
  };

  return (
    <>
      <Typography variant="h4">生徒を新規作成する</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Title title="連携ユーザー" />
        <Select
          fullWidth
          id="userId"
          error={!!errors.userId}
          defaultValue={""}
          {...register("userId")}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.email}
            </MenuItem>
          ))}
        </Select>

        <Title title="名前" />
        <TextField
          fullWidth
          id="firstName"
          label="名前"
          error={!!errors.firstName}
          helperText={!!errors.firstName ? errors.firstName.message : ""}
          {...register("firstName")}
        />

        <Title title="名前（読み仮名）" />
        <TextField
          fullWidth
          id="firstNameKana"
          label="名前（読み仮名）"
          error={!!errors.firstNameKana}
          helperText={
            !!errors.firstNameKana
              ? errors.firstNameKana.message
              : "カタカナで入力してください"
          }
          {...register("firstNameKana")}
        />

        <Title title="苗字" />
        <TextField
          id="lastName"
          fullWidth
          label="苗字"
          error={!!errors.lastName}
          helperText={
            !!errors.lastName
              ? errors.lastName.message
              : "苗字を入力してください"
          }
          {...register("lastName")}
        />

        <Title title="苗字（読み仮名）" />
        <TextField
          fullWidth
          id="lastNameKana"
          label="苗字（読み仮名）"
          error={!!errors.lastName}
          helperText={
            !!errors.lastNameKana
              ? errors.lastNameKana.message
              : "カタカナで入力してください"
          }
          {...register("lastNameKana")}
        />

        <Title title="性別" />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <RadioGroup row name="radio-buttons-group" {...field}>
              <FormControlLabel
                value={Gender.MALE}
                control={<Radio />}
                label="男の子"
              />
              <FormControlLabel
                value={Gender.FEMALE}
                control={<Radio />}
                label="女の子"
              />
              <FormControlLabel
                value={Gender.OTHER}
                control={<Radio />}
                label="その他"
              />
            </RadioGroup>
          )}
        />

        <Title title="小学校名" />
        <TextField
          fullWidth
          id="school"
          label="小学校名"
          error={!!errors.school}
          helperText={
            !!errors.school
              ? errors.school.message
              : "通っている学校の名前を入力してください"
          }
          {...register("school")}
        />

        <Title title="塾" />
        <TextField
          fullWidth
          id="juku"
          label="塾名"
          error={!!errors.juku}
          helperText={
            !!errors.juku
              ? errors.juku.message
              : "通っている塾の名前を入力してください"
          }
          {...register("juku")}
        />

        <Title title="塾の校舎" />
        <TextField
          fullWidth
          id="jukuBuilding"
          label="塾の校舎"
          error={!!errors.jukuBuilding}
          helperText={
            !!errors.jukuBuilding
              ? errors.jukuBuilding.message
              : "通っている校舎名を入力してください"
          }
          {...register("jukuBuilding")}
        />

        <Title title="学年" />
        <TextField
          fullWidth
          id="grade"
          label="学年"
          error={!!errors.grade}
          helperText={
            !!errors.grade
              ? errors.grade.message
              : "学年を半角英数字で入力してください"
          }
          {...register("grade")}
        />

        <Title title="誕生日" />
        <Controller
          name="birthday"
          control={control}
          defaultValue={null}
          {...register("birthday")}
          render={({ field }) => (
            <DatePicker
              {...field}
              format="YYYY/MM/DD"
              label="誕生日"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  error: !!errors.birthday,
                  helperText: !!errors.birthday && errors.birthday.message,
                },
              }}
            />
          )}
        />

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
      {/* ダイアログ */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>生徒情報が作成されました</DialogTitle>
        <DialogContent>
          <DialogContentText>
            生徒情報の一覧画面へと遷移しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            確認
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
