import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { CreateUserDto } from "../users/types/create-user.dto";
import { Role } from "./types/role.enum";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { RoleSelect } from "./RoleSelect";
import { UsernameTextField } from "./UsernameTextField";
import { EmailTextField } from "./edit/EmailTextField";
import { PasswordTextField } from "./edit/PasswordTextField";
import { PhoneTextField } from "./edit/PhoneTextField";
import { ChatWebhookUrlTextField } from "./edit/ChatWebhookUrlTextField";

type UserNewProps = {
  register: UseFormRegister<CreateUserDto>;
  control: Control<CreateUserDto, any>;
  errors: FieldErrors<CreateUserDto>;
};

export const UserNew = ({ register, control, errors }: UserNewProps) => {
  return (
    <>
      <HeadlineTypography>アカウントタイプ</HeadlineTypography>
      <RoleSelect
        roles={[Role.CUSTOMER, Role.TEACHER]}
        name="role"
        control={control}
        errors={errors}
      />

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
    </>
  );
};
