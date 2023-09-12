import { useContext, useEffect, useState } from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Student } from "../../dto/student.class";
import { DatePicker } from "@mui/x-date-pickers";
import { LoadingBox } from "../../components/LoadingData";
import { FirstNameTextField } from "../../components/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/customers/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/customers/LastNameTextField";
import { LastNameKanaTextField } from "../../components/customers/LastNameKanaTextField";
import { SchoolTextField } from "../../components/students/SchoolTextField";
import { JukuTextField } from "../../components/students/JukuTextField";
import { JukuBuildingTextField } from "../../components/students/JukuBuildingTextField";
import { GradeTextField } from "../../components/students/GradeTextField";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { HeadEditBox } from "../../components/HeadEditBox";
import { CancelEditButton } from "../../components/components/CancelEditButton";
import { SaveEditButton } from "../../components/components/SaveEditButton";
import { StudentContext } from "../../contexts/StudentContextProvider";
import dayjs from "dayjs";

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
  const { studentId } = useParams();
  const { getStudentById, updateStudentById } = useContext(StudentContext);
  const navigate = useNavigate();

  const [student, setStudent] = useState<null | Student>(null);
  const [sending, setSending] = useState(false);

  const resolver = classValidatorResolver(UpdateStudentDto);
  const {
    register,
    handleSubmit,
    setValue,
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
      school: "",
      juku: "",
      jukuBuilding: "",
      birthday: null,
    },
  });

  useEffect(() => {
    getStudentById(studentId).then((found) => {
      if (found) {
        setStudent(found);
        setValue("firstName", found.firstName);
        setValue("firstNameKana", found.firstNameKana);
        setValue("lastName", found.lastName);
        setValue("lastNameKana", found.lastNameKana);
        setValue("gender", found.gender);
        setValue("school", found.school);
        setValue("juku", found.juku);
        setValue("jukuBuilding", found.jukuBuilding);
        setValue("birthday", dayjs(found.birthday) as unknown as Date);
      }
    });
  }, [getStudentById, studentId]);

  const onSubmit: SubmitHandler<UpdateStudentDto> = (data) => {
    if (sending) {
      return;
    }
    setSending(true);
    updateStudentById(studentId, data)
      .then((student) => {
        if (student) {
          navigate(`/students/${student.id}`);
        }
      })
      .finally(() => {
        setSending(false);
      });
  };

  if (!student) {
    return <LoadingBox message="生徒情報を取得中です" />;
  }

  return (
    <>
      <PageTitleTypography>生徒情報を更新する</PageTitleTypography>

      <HeadEditBox>
        <CancelEditButton onClick={() => navigate(`/students/${studentId}`)} />
        <SaveEditButton onClick={handleSubmit(onSubmit)} />
      </HeadEditBox>

      <HeadlineTypography>名前</HeadlineTypography>
      <FirstNameTextField errors={errors} {...register("firstName")} />

      <HeadlineTypography>名前（読み仮名）</HeadlineTypography>
      <FirstNameKanaTextField errors={errors} {...register("firstNameKana")} />

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

      <HeadlineTypography>塾名</HeadlineTypography>
      <JukuTextField errors={errors} {...register("juku")} />

      <HeadlineTypography>塾の校舎</HeadlineTypography>
      <JukuBuildingTextField errors={errors} {...register("juku")} />

      <HeadlineTypography>学年</HeadlineTypography>
      <GradeTextField errors={errors} {...register("jukuBuilding")} />

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
    </>
  );
};
