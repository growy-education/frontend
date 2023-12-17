import { Box, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { Gender } from "../../features/students/types/gender.enum";
import { Role } from "../../features/users/types/role.enum";
import { FirstNameTextField } from "../../components/Element/TextField/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/Element/TextField/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/Element/TextField/LastNameTextField";
import { LastNameKanaTextField } from "../../components/Element/TextField/LastNameKanaTextField";
import { SchoolTextField } from "../../features/students/SchoolTextField";
import { JukuTextField } from "../../features/students/JukuTextField";
import { JukuBuildingTextField } from "../../features/students/JukuBuildingTextField";
import { GradeTextField } from "../../features/students/GradeTextField";
import { CreateStudentDto } from "../../features/students/types/create-student.dto";
import { useCreateStudent } from "../../features/students/api/createStudent";
import { UserSelect } from "../../features/users/UserSelect";
import { GenderRadioGroup } from "../../features/students/GenderRadioGroup";
import { BirthdayDatePicker } from "../../features/students/BirthdayDatePicker";
import { SubmitButton } from "../../features/SubmitButton";

export const StudentNew = () => {
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

  const mutation = useCreateStudent();

  const onSubmit: SubmitHandler<CreateStudentDto> = (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(data);
  };

  return (
    <>
      <Typography variant="h4">生徒を新規作成する</Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <HeadlineTypography>連携ユーザー</HeadlineTypography>
        <UserSelect
          errors={errors}
          filterDto={{ role: Role.PENDING }}
          {...register("userId")}
        />

        <HeadlineTypography>苗字</HeadlineTypography>
        <LastNameTextField errors={errors} {...register("lastName")} />

        <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
        <LastNameKanaTextField errors={errors} {...register("lastNameKana")} />

        <HeadlineTypography>名前</HeadlineTypography>
        <FirstNameTextField errors={errors} {...register("firstName")} />

        <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
        <FirstNameKanaTextField
          errors={errors}
          {...register("firstNameKana")}
        />

        <HeadlineTypography>性別</HeadlineTypography>
        <GenderRadioGroup errors={errors} control={control} />

        <HeadlineTypography>小学校名</HeadlineTypography>
        <SchoolTextField errors={errors} {...register("school")} />

        <HeadlineTypography>塾</HeadlineTypography>
        <JukuTextField errors={errors} {...register("juku")} />

        <HeadlineTypography>塾の校舎</HeadlineTypography>
        <JukuBuildingTextField errors={errors} {...register("jukuBuilding")} />
        <HeadlineTypography>学年</HeadlineTypography>

        <GradeTextField errors={errors} {...register("grade")} />

        <HeadlineTypography>誕生日</HeadlineTypography>
        <BirthdayDatePicker errors={errors} control={control} />

        <Box margin="0.5em">
          <SubmitButton disabled={mutation.isPending} />
        </Box>
      </Box>
    </>
  );
};
