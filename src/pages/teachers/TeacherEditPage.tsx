import { useEffect } from "react";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { TeacherStatus } from "../../features/teachers/types/teacher-status.enum";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { FirstNameTextField } from "../../features/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../features/customers/FirstNameKanaTextField";
import { LastNameKanaTextField } from "../../features/customers/LastNameKanaTextField";
import { LastNameTextField } from "../../features/customers/LastNameTextField";
import { ChatworkAccountIdTextField } from "../../features/teachers/chatworkAccountIdTextField";
import { HeadEditBox } from "../../features/HeadEditBox";
import { CancelEditButton } from "../../components/Element/Button/CancelEditButton";
import { SaveEditButton } from "../../components/Element/Button/SaveEditButton";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateTeacherDto } from "../../features/teachers/types/update-teacher.dto";
import { useTeacher } from "../../features/teachers/api/getTeacher";
import { useUpdateTeacher } from "../../features/teachers/api/updateTeacher";
import { TeacherStatusRadioGroup } from "../../features/teachers/TeacherStatusRadioGroup";

export const TeacherEdit = () => {
  const { teacherId } = useParams();

  const { data: teacher } = useTeacher({ teacherId });

  const resolver = classValidatorResolver(UpdateTeacherDto);
  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver,
    defaultValues: {
      firstName: "",
      firstNameKana: "",
      lastName: "",
      lastNameKana: "",
      chatworkAccountId: "",
      status: TeacherStatus.INACTIVE,
    },
  });

  useEffect(() => {
    if (teacher) {
      setValue("firstName", teacher.firstName);
      setValue("firstNameKana", teacher.firstNameKana);
      setValue("lastName", teacher.lastName);
      setValue("lastNameKana", teacher.lastNameKana);
      setValue("chatworkAccountId", teacher.chatworkAccountId);
      setValue("status", teacher.status);
    }
  }, [setValue, teacher]);

  const mutation = useUpdateTeacher();

  const onSubmit: SubmitHandler<UpdateTeacherDto> = (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: teacherId, dto: data });
  };

  return (
    <>
      <HeadEditBox>
        <CancelEditButton onClick={() => reset()} />
        <SaveEditButton onClick={handleSubmit(onSubmit)} />
      </HeadEditBox>

      <HeadlineTypography>苗字</HeadlineTypography>
      <LastNameTextField errors={errors} {...register("lastName")} />

      <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
      <LastNameKanaTextField errors={errors} {...register("lastNameKana")} />

      <HeadlineTypography>名前</HeadlineTypography>
      <FirstNameTextField errors={errors} {...register("firstName")} />

      <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
      <FirstNameKanaTextField errors={errors} {...register("firstNameKana")} />

      <HeadlineTypography>Chatwork Account ID</HeadlineTypography>
      <ChatworkAccountIdTextField
        errors={errors}
        {...register("chatworkAccountId")}
      />

      <HeadlineTypography>ステータス</HeadlineTypography>
      <TeacherStatusRadioGroup errors={errors} control={control} />
    </>
  );
};
