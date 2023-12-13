import { Box } from "@mui/material";

import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { UsernameTextField } from "../../features/users/UsernameTextField";
import { EmailTextField } from "../../features/users/edit/EmailTextField";
import { PasswordTextField } from "../../features/users/edit/PasswordTextField";
import { PhoneTextField } from "../../features/users/edit/PhoneTextField";
import { ChatWebhookUrlTextField } from "../../features/users/edit/ChatWebhookUrlTextField";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { SubmitButton } from "../../features/SubmitButton";

import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { CreateUserDto } from "../../features/users/types/create-user.dto";
import { useCreateUser } from "../../features/users/api/createUser";

export const UserNew = () => {
  const resolver = classValidatorResolver(CreateUserDto);
  const {
    formState: { errors },
    handleSubmit,
    reset,
    register,
  } = useForm<CreateUserDto>({ resolver });

  const mutation = useCreateUser();

  const onSubmit: SubmitHandler<CreateUserDto> = (data) => {
    mutation.mutate(data);
  };

  return (
    <>
      <PageTitleTypography>ユーザーを新規作成する</PageTitleTypography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <HeadlineTypography>ユーザー名</HeadlineTypography>
        <UsernameTextField errors={errors} {...register("username")} />

        <HeadlineTypography>メールアドレス</HeadlineTypography>
        <EmailTextField errors={errors} {...register("email")} />

        <HeadlineTypography>パスワード</HeadlineTypography>
        <PasswordTextField errors={errors} {...register("password")} />

        <HeadlineTypography>電話番号</HeadlineTypography>
        <PhoneTextField errors={errors} {...register("phone")} />

        <HeadlineTypography>GoogleChat Webhook URL(DM)</HeadlineTypography>
        <ChatWebhookUrlTextField
          errors={errors}
          {...register("chatWebhookUrl")}
        />

        <Box margin="0.5em">
          <SubmitButton
            onClick={handleSubmit(onSubmit)}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "送信中..." : "送信する"}
          </SubmitButton>
        </Box>
      </Box>
    </>
  );
};
