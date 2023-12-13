import { Box, Typography } from "@mui/material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { FirstNameTextField } from "../../features/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../features/customers/FirstNameKanaTextField";
import { LastNameTextField } from "../../features/customers/LastNameTextField";
import { LastNameKanaTextField } from "../../features/customers/LastNameKanaTextField";
import { ChatworkAccountIdTextField } from "../../features/teachers/chatworkAccountIdTextField";
import { CreateTeacherDto } from "../../features/teachers/types/create-teacher.dto";
import { useCreateTeacher } from "../../features/teachers/api/createTeacher";
import { UserSelect } from "../../features/users/UserSelect";
import { SubmitButton } from "../../features/SubmitButton";
import { Role } from "../../features/users/types/role.enum";

export const TeacherNew = () => {
  const resolver = classValidatorResolver(CreateTeacherDto);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTeacherDto>({ resolver });

  const mutation = useCreateTeacher();

  const onSubmit: SubmitHandler<CreateTeacherDto> = (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(data);
  };

  return (
    <>
      <Typography variant="h4">講師を新規作成する</Typography>

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

        <HeadlineTypography>ChatworkAccountID</HeadlineTypography>
        <ChatworkAccountIdTextField
          errors={errors}
          {...register("chatworkAccountId")}
        />

        <Box margin="0.5em">
          <SubmitButton disabled={mutation.isPending} />
        </Box>
      </Box>
    </>
  );
};
