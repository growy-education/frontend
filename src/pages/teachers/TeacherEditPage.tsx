import { useContext, useEffect, useState } from "react";
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
import { Relationship } from "../../dto/enum/relationship.enum";
import { TeacherStatus } from "../../dto/enum/teacher-status.enum";
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FirstNameTextField } from "../../components/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/customers/FirstNameKanaTextField";
import { LastNameKanaTextField } from "../../components/customers/LastNameKanaTextField";
import { LastNameTextField } from "../../components/customers/LastNameTextField";
import { ChatworkAccountIdTextField } from "../../components/teachers/chatworkAccountIdTextField";
import { HeadEditBox } from "../../components/HeadEditBox";
import { CancelEditButton } from "../../components/components/CancelEditButton";
import { SaveEditButton } from "../../components/components/SaveEditButton";
import { useNavigate, useParams } from "react-router-dom";
import { TeacherContext } from "../../contexts/TeacherContextProvider";

class UpdateTeacherDto {
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
  @IsNotEmpty({ message: "ChatworkIDを入力してください" })
  @IsNumberString({}, { message: "ChatworkIDは数字で入力してください" })
  chatworkAccountId: string;

  @IsOptional()
  @IsEnum(TeacherStatus, { message: "ステータスを選択してください" })
  status?: TeacherStatus;
}

export const TeacherEdit = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const { getTeacherById, updateTeacherById } = useContext(TeacherContext);

  const [sending, setSending] = useState(false);

  const resolver = classValidatorResolver(UpdateTeacherDto);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver,
    defaultValues: {
      status: TeacherStatus.INACTIVE,
    },
  });

  useEffect(() => {
    getTeacherById(teacherId).then((found) => {
      setValue("firstName", found.firstName);
      setValue("firstNameKana", found.firstNameKana);
      setValue("lastName", found.lastName);
      setValue("lastNameKana", found.lastNameKana);
      setValue("chatworkAccountId", found.chatworkAccountId);
      setValue("status", found.status);
    });
  }, [getTeacherById, setValue, teacherId]);

  const onSubmit: SubmitHandler<UpdateTeacherDto> = (data) => {
    if (sending) {
      return;
    }
    setSending(true);
    updateTeacherById(teacherId, data)
      .then((teacher) => {
        if (teacher) {
          navigate(`/teachers/${teacher.id}`);
        }
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <>
      <HeadEditBox>
        <CancelEditButton onClick={() => navigate(`/teachers/${teacherId}`)} />
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

      <HeadlineTypography>Chatwork Account ID</HeadlineTypography>
      <ChatworkAccountIdTextField
        errors={errors}
        {...register("chatworkAccountId")}
      />

      <HeadlineTypography>ステータス</HeadlineTypography>
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <RadioGroup row name="radio-buttons-group" {...field}>
            <FormControlLabel
              value={TeacherStatus.ACTIVE}
              control={<Radio />}
              label="質問回答受付中"
            />
            <FormControlLabel
              value={TeacherStatus.INACTIVE}
              control={<Radio />}
              label="質問回答拒否中"
            />
          </RadioGroup>
        )}
      />
    </>
  );
};
