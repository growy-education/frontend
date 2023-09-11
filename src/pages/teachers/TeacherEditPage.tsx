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
import { useForm } from "react-hook-form";
import { FirstNameTextField } from "../../components/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/customers/FirstNameKanaTextField";
import { LastNameKanaTextField } from "../../components/customers/LastNameKanaTextField";
import { LastNameTextField } from "../../components/customers/LastNameTextField";
import { ChatworkAccountIdTextField } from "../../components/teachers/chatworkAccountIdTextField";
import { HeadEditBox } from "../../components/HeadEditBox";
import { CancelEditButton } from "../../components/components/CancelEditButton";
import { SaveEditButton } from "../../components/components/SaveEditButton";

class UpdateTeacherDto {
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

  @IsNotEmpty({ message: "ChatworkIDを入力してください" })
  @IsNumberString({}, { message: "ChatworkIDは数字で入力してください" })
  chatworkAccountId: string;
}

export const TeacherEdit = () => {
  const { axiosConfig } = useContext(AxiosContext);

  const resolver = classValidatorResolver(UpdateTeacherDto);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({ resolver });

  return (
    <>
      <HeadEditBox>
        <CancelEditButton />
        <SaveEditButton />
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
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={TeacherStatus.INACTIVE}
        name="radio-buttons-group"
      >
        <FormControlLabel
          value={Relationship.FATHER}
          control={<Radio />}
          label="現在対応不可能"
        />
        <FormControlLabel
          value={Relationship.MOTHER}
          control={<Radio />}
          label="現在対応可能"
        />
      </RadioGroup>
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
