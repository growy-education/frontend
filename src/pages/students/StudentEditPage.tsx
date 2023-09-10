import { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import SendIcon from "@mui/icons-material/Send";
import {
  IsDate,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxDate,
  MinDate,
} from "class-validator";
import { Gender } from "../../dto/enum/gender.enum";
import { Type } from "class-transformer";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Student } from "../../dto/student.class";
import { DatePicker } from "@mui/x-date-pickers";
import { LoadingBox } from "../../components/LoadingData";

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

class UpdateStudentDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "お名前を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  firstName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "お名前（読み仮名）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  firstNameKana: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "苗字を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "苗字（読み仮名）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  lastNameKana: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "小学校名を入力してください" })
  school: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "塾名を入力してください" })
  juku: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "塾の校舎名を入力してください" })
  jukuBuilding: string;

  @IsOptional()
  @IsNotEmpty({ message: "学年を入力してください" })
  @IsIn(["1", "2", "3", "4", "5", "6"], {
    message: "学年は半角英数字で入力してください",
  })
  grade: string;

  // format string to Date
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  @MaxDate(getMaxDate(), { message: "生年月日が新しすぎます" })
  @MinDate(getMinDate(), { message: "生年月日が古すぎます" })
  birthday: Date;
}

export const StudentEdit = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const [student, setStudent] = useState<null | Student>(null);

  const resolver = classValidatorResolver(UpdateStudentDto);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateStudentDto>({
    resolver,
    defaultValues: {
      firstName: "",
      firstNameKana: "",
      lastName: "",
      lastNameKana: "",
      gender: Gender.MALE,
    },
  });

  if (!student) {
    return <LoadingBox message="生徒情報を取得中です" />;
  }

  return (
    <>
      <Typography variant="h4">生徒情報を更新する</Typography>
      <HeadlineTypography>名前</HeadlineTypography>
      <TextField
        fullWidth
        id="firstName"
        label="名前"
        error={!!errors.firstName}
        helperText={!!errors.firstName ? errors.firstName.message : ""}
        {...register("firstName")}
      />

      <HeadlineTypography>名前（読み仮名）</HeadlineTypography>
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

      <HeadlineTypography>苗字</HeadlineTypography>
      <TextField
        id="lastName"
        fullWidth
        label="苗字"
        error={!!errors.lastName}
        helperText={
          !!errors.lastName ? errors.lastName.message : "苗字を入力してください"
        }
        {...register("lastName")}
      />

      <HeadlineTypography>苗字（読み仮名）</HeadlineTypography>
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

      <HeadlineTypography>塾名</HeadlineTypography>
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

      <HeadlineTypography>塾の校舎</HeadlineTypography>
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

      <HeadlineTypography>学年</HeadlineTypography>
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
          color="primary"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => console.log("送信しちゃうよ")}
        >
          更新する
        </Button>
      </Box>
    </>
  );
};
