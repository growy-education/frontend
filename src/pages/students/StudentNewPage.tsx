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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Gender } from "../../dto/enum/gender.enum";
import { User } from "../../dto/user.class";
import axios from "axios";
import { Role } from "../../dto/enum/role.enum";
import { FirstNameTextField } from "../../components/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/customers/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/customers/LastNameTextField";
import { LastNameKanaTextField } from "../../components/customers/LastNameKanaTextField";
import { SchoolTextField } from "../../components/students/SchoolTextField";
import { JukuTextField } from "../../components/students/JukuTextField";
import { JukuBuildingTextField } from "../../components/students/JukuBuildingTextField";
import { GradeTextField } from "../../components/students/GradeTextField";

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
        <HeadlineTypography>連携ユーザー</HeadlineTypography>
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

        <HeadlineTypography>名前</HeadlineTypography>
        <FirstNameTextField errors={errors} {...register("firstName")} />

        <HeadlineTypography>名前（読み仮名）</HeadlineTypography>
        <FirstNameKanaTextField
          errors={errors}
          {...register("firstNameKana")}
        />

        <HeadlineTypography>苗字</HeadlineTypography>
        <LastNameTextField errors={errors} {...register("lastName")} />

        <HeadlineTypography>苗字（読み仮名）</HeadlineTypography>
        <LastNameKanaTextField errors={errors} {...register("lastNameKana")} />

        <HeadlineTypography>性別</HeadlineTypography>
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

        <HeadlineTypography>小学校名</HeadlineTypography>
        <SchoolTextField errors={errors} {...register("school")} />

        <HeadlineTypography>塾</HeadlineTypography>
        <JukuTextField errors={errors} {...register("juku")} />

        <HeadlineTypography>塾の校舎</HeadlineTypography>
        <JukuBuildingTextField errors={errors} {...register("jukuBuilding")} />
        <HeadlineTypography>学年</HeadlineTypography>

        <GradeTextField errors={errors} {...register("grade")} />

        <HeadlineTypography>誕生日</HeadlineTypography>
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
