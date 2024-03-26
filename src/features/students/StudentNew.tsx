import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateUserDto } from "../users/types/create-user.dto";

import { FirstNameKanaTextField } from "../../components/Element/TextField/FirstNameKanaTextField";
import { FirstNameTextField } from "../../components/Element/TextField/FirstNameTextField";
import { LastNameKanaTextField } from "../../components/Element/TextField/LastNameKanaTextField";
import { LastNameTextField } from "../../components/Element/TextField/LastNameTextField";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { GenderRadioGroup } from "./GenderRadioGroup";
import { SchoolTextField } from "./SchoolTextField";
import { JukuTextField } from "./JukuTextField";
import { JukuBuildingTextField } from "./JukuBuildingTextField";
import { GradeTextField } from "./GradeTextField";
import { BirthdayDatePicker } from "./BirthdayDatePicker";
import { GenderSelect } from "../../components/Element/Select/GenderSelect";

type StudentNewProps = {
  register: UseFormRegister<CreateUserDto>;
  control: Control<CreateUserDto, any>;
  errors: FieldErrors<CreateUserDto>;
};

export const StudentNew = ({ register, control, errors }: StudentNewProps) => {
  return (
    <>
      <HeadlineTypography>苗字</HeadlineTypography>
      <LastNameTextField
        error={errors.studentDto?.lastName}
        {...register("studentDto.lastName")}
      />

      <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
      <LastNameKanaTextField
        error={errors.studentDto?.lastNameKana}
        {...register("studentDto.lastNameKana")}
      />

      <HeadlineTypography>名前</HeadlineTypography>
      <FirstNameTextField
        error={errors.studentDto?.firstName}
        {...register("studentDto.firstName")}
      />

      <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
      <FirstNameKanaTextField
        error={errors.studentDto?.firstNameKana}
        {...register("studentDto.firstNameKana")}
      />

      <HeadlineTypography>性別</HeadlineTypography>
      <GenderSelect
        name={"studentDto.gender"}
        error={errors.studentDto?.gender}
        control={control}
      />

      <HeadlineTypography>小学校名</HeadlineTypography>
      <SchoolTextField
        error={errors.studentDto?.school}
        {...register("studentDto.school")}
      />

      <HeadlineTypography>塾</HeadlineTypography>
      <JukuTextField
        error={errors.studentDto?.juku}
        {...register("studentDto.juku")}
      />

      <HeadlineTypography>塾の校舎</HeadlineTypography>
      <JukuBuildingTextField
        error={errors.studentDto?.jukuBuilding}
        {...register("studentDto.jukuBuilding")}
      />

      <HeadlineTypography>学年</HeadlineTypography>
      <GradeTextField
        error={errors.studentDto?.grade}
        {...register("studentDto.grade")}
      />

      <HeadlineTypography>誕生日</HeadlineTypography>
      <BirthdayDatePicker
        name={"studentDto.birthday"}
        error={errors.studentDto?.birthday}
        control={control}
      />
    </>
  );
};
