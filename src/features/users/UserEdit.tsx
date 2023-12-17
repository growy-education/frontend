import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { UsernameTextField } from "./UsernameTextField";
import { EmailTextField } from "./edit/EmailTextField";
import { PhoneTextField } from "./edit/PhoneTextField";
import { ChatWebhookUrlTextField } from "./edit/ChatWebhookUrlTextField";
import { HeaderBox } from "../../components/Layout/HeaderBox";
import { CancelEditButton } from "../../components/Element/Button/CancelEditButton";
import { SaveEditButton } from "../../components/Element/Button/SaveEditButton";

import { User } from "./types/user.class";
import { UpdateUserDto } from "./types/update-user.dto";
import { useUpdateUser } from "./api/updateUser";

type UserEditProps = {
  user: User;
};

export const UserEdit = ({ user }: UserEditProps) => {
  const mutation = useUpdateUser();

  const resolver = classValidatorResolver(UpdateUserDto);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver,
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      chatWebhookUrl: user?.chatWebhookUrl || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateUserDto> = (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: user.id, dto: data });
  };

  return (
    <>
      <HeaderBox>
        <CancelEditButton onClick={() => reset()} />
        <SaveEditButton
          onClick={handleSubmit(onSubmit)}
          disabled={mutation.isPending}
        />
      </HeaderBox>

      <HeadlineTypography>ユーザー名</HeadlineTypography>
      <UsernameTextField errors={errors} {...register("username")} />

      <HeadlineTypography>メールアドレス</HeadlineTypography>
      <EmailTextField errors={errors} {...register("email")} />

      <HeadlineTypography>電話番号</HeadlineTypography>
      <PhoneTextField errors={errors} {...register("phone")} />

      <HeadlineTypography>GoogleChat Webhook URL(DM)</HeadlineTypography>
      <ChatWebhookUrlTextField
        errors={errors}
        {...register("chatWebhookUrl")}
      />
    </>
  );
};
