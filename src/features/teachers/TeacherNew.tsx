import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateUserDto } from "../users/types/create-user.dto";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { LastNameTextField } from "../../components/Element/TextField/LastNameTextField";
import { LastNameKanaTextField } from "../../components/Element/TextField/LastNameKanaTextField";
import { FirstNameTextField } from "../../components/Element/TextField/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/Element/TextField/FirstNameKanaTextField";
import { ChatworkAccountIdTextField } from "./chatworkAccountIdTextField";

type TeacherNewProps = {
  register: UseFormRegister<CreateUserDto>;
  control: Control<CreateUserDto, any>;
  errors: FieldErrors<CreateUserDto>;
};

export const TeacherNew = ({ register, control, errors }: TeacherNewProps) => {
  return (
    <>
      <HeadlineTypography>苗字</HeadlineTypography>
      <LastNameTextField
        error={errors.teacherDto?.lastName}
        {...register("teacherDto.lastName")}
      />

      <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
      <LastNameKanaTextField
        error={errors.teacherDto?.lastNameKana}
        {...register("teacherDto.lastNameKana")}
      />

      <HeadlineTypography>名前</HeadlineTypography>
      <FirstNameTextField
        error={errors.teacherDto?.firstName}
        {...register("teacherDto.firstName")}
      />

      <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
      <FirstNameKanaTextField
        error={errors.teacherDto?.firstNameKana}
        {...register("teacherDto.firstNameKana")}
      />

      <HeadlineTypography>ChatworkAccountID</HeadlineTypography>
      <ChatworkAccountIdTextField
        error={errors.teacherDto?.chatworkAccountId}
        {...register("teacherDto.chatworkAccountId")}
      />
    </>
  );
};
