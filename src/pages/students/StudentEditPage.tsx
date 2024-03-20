import { useEffect } from "react";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";

import { Gender } from "../../features/students/types/gender.enum";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { LoadingBox } from "../../features/LoadingData";
import { FirstNameTextField } from "../../components/Element/TextField/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/Element/TextField/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/Element/TextField/LastNameTextField";
import { LastNameKanaTextField } from "../../components/Element/TextField/LastNameKanaTextField";
import { SchoolTextField } from "../../features/students/SchoolTextField";
import { JukuTextField } from "../../features/students/JukuTextField";
import { JukuBuildingTextField } from "../../features/students/JukuBuildingTextField";
import { GradeTextField } from "../../features/students/GradeTextField";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { HeaderBox } from "../../components/Layout/HeaderBox";
import { CancelEditButton } from "../../components/Element/Button/CancelEditButton";
import { SaveEditButton } from "../../components/Element/Button/SaveEditButton";
import dayjs from "dayjs";
import { AlertBox } from "../../features/AlertBox";
import { useStudent } from "../../features/students/api/getStudent";
import { useUpdateStudent } from "../../features/students/api/updateStudent";
import { UpdateStudentDto } from "../../features/students/types/update-student.dto";
import { GenderRadioGroup } from "../../features/students/GenderRadioGroup";
import { BirthdayDatePicker } from "../../features/students/BirthdayDatePicker";

export const StudentEdit = () => {
  const { studentId } = useParams();

  const { data: student, isError, isPending } = useStudent({ studentId });

  const resolver = classValidatorResolver(UpdateStudentDto);
  const {
    reset,
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
    if (student) {
      setValue("firstName", student.firstName);
      setValue("firstNameKana", student.firstNameKana);
      setValue("lastName", student.lastName);
      setValue("lastNameKana", student.lastNameKana);
      setValue("gender", student.gender);
      setValue("school", student.school);
      setValue("juku", student.juku);
      setValue("jukuBuilding", student.jukuBuilding);
      setValue("birthday", dayjs(student.birthday));
    }
  }, [setValue, student]);

  const mutation = useUpdateStudent();

  const onSubmit: SubmitHandler<UpdateStudentDto> = (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: studentId, dto: data });
  };

  if (isPending) {
    return <LoadingBox message="生徒情報を取得中です" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="ネットワークエラー"
        description="生徒情報の取得に失敗しました。ネットワーク状態を確認してください。"
      />
    );
  }

  return (
    <>
      <PageTitleTypography>生徒情報を更新する</PageTitleTypography>

      <HeaderBox>
        <CancelEditButton onClick={() => reset()} />
        <SaveEditButton onClick={handleSubmit(onSubmit)} />
      </HeaderBox>

      <HeadlineTypography>苗字</HeadlineTypography>
      <LastNameTextField errors={errors} {...register("lastName")} />

      <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
      <LastNameKanaTextField errors={errors} {...register("lastNameKana")} />

      <HeadlineTypography>名前</HeadlineTypography>
      <FirstNameTextField errors={errors} {...register("firstName")} />

      <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
      <FirstNameKanaTextField errors={errors} {...register("firstNameKana")} />

      <HeadlineTypography>性別</HeadlineTypography>
      <GenderRadioGroup errors={errors} control={control} />

      <HeadlineTypography>小学校名</HeadlineTypography>
      <SchoolTextField errors={errors} {...register("school")} />

      <HeadlineTypography>塾名</HeadlineTypography>
      <JukuTextField errors={errors} {...register("juku")} />

      <HeadlineTypography>塾の校舎</HeadlineTypography>
      <JukuBuildingTextField errors={errors} {...register("juku")} />

      <HeadlineTypography>学年</HeadlineTypography>
      <GradeTextField errors={errors} {...register("jukuBuilding")} />

      <HeadlineTypography>誕生日</HeadlineTypography>
      <BirthdayDatePicker errors={errors} control={control} />
    </>
  );
};
