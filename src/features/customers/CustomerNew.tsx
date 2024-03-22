import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { FirstNameKanaTextField } from "../../components/Element/TextField/FirstNameKanaTextField";
import { FirstNameTextField } from "../../components/Element/TextField/FirstNameTextField";
import { LastNameKanaTextField } from "../../components/Element/TextField/LastNameKanaTextField";
import { LastNameTextField } from "../../components/Element/TextField/LastNameTextField";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { RelationshipRadioGroup } from "./RelationshipRadioGroup";
import { CustomerServicesCheckboxes } from "./ServicesCheckboxes";
import { SpaceWebhookUrlTextField } from "./SpaceWebhookUrlTextField";
import { CreateUserDto } from "../users/types/create-user.dto";

type CustomerNewProps = {
  register: UseFormRegister<CreateUserDto>;
  control: Control<CreateUserDto, any>;
  errors: FieldErrors<CreateUserDto>;
};

export const CustomerNew = ({
  register,
  control,
  errors,
}: CustomerNewProps) => {
  return (
    <>
      <HeadlineTypography>苗字</HeadlineTypography>
      <LastNameTextField
        error={errors.customerDto?.lastName}
        {...register("customerDto.lastName")}
      />

      <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
      <LastNameKanaTextField
        error={errors.customerDto?.lastNameKana}
        {...register("customerDto.lastNameKana")}
      />

      <HeadlineTypography>名前</HeadlineTypography>
      <FirstNameTextField
        error={errors.customerDto?.firstName}
        {...register("customerDto.firstName")}
      />

      <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
      <FirstNameKanaTextField
        error={errors.customerDto?.firstNameKana}
        {...register("customerDto.firstNameKana")}
      />

      <HeadlineTypography>続柄</HeadlineTypography>
      <RelationshipRadioGroup
        name={"customerDto.relationship"}
        error={errors.customerDto?.relationship}
        control={control}
      />

      <HeadlineTypography>利用可能サービス</HeadlineTypography>
      <CustomerServicesCheckboxes
        name={"customerDto.services"}
        error={errors.customerDto?.services}
        control={control}
      />

      <HeadlineTypography>GoogleChatのWebhookURL(Space)</HeadlineTypography>
      <SpaceWebhookUrlTextField
        error={errors.customerDto?.spaceWebhookUrl}
        {...register("customerDto.spaceWebhookUrl")}
      />
    </>
  );
};
