import { Box } from "@mui/material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { Relationship } from "../../features/customers/types/relationship.enum";

import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Role } from "../../features/users/types/role.enum";
import { FirstNameTextField } from "../../components/Element/TextField/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/Element/TextField/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/Element/TextField/LastNameTextField";
import { LastNameKanaTextField } from "../../components/Element/TextField/LastNameKanaTextField";
import { SpaceWebhookUrlTextField } from "../../features/customers/SpaceWebhookUrlTextField";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { CreateCustomerDto } from "../../features/customers/types/create-customer.dto";
import { UserSelect } from "../../features/users/UserSelect";
import { useCreateCustomer } from "../../features/customers/api/createCustomer";
import { SubmitButton } from "../../features/SubmitButton";
import { CustomerServicesCheckboxes } from "../../features/customers/ServicesCheckboxes";
import { RelationshipRadioGroup } from "../../features/customers/RelationshipRadioGroup";

export const CustomerNewPage = () => {
  const mutation = useCreateCustomer();

  const resolver = classValidatorResolver(CreateCustomerDto);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateCustomerDto>({
    resolver,
    defaultValues: {
      relationship: Relationship.FATHER,
    },
  });

  const onSubmit: SubmitHandler<CreateCustomerDto> = (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate(data);
  };

  return (
    <>
      <PageTitleTypography>保護者を新規作成する</PageTitleTypography>
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

        <HeadlineTypography>続柄</HeadlineTypography>
        <RelationshipRadioGroup errors={errors} control={control} />

        <HeadlineTypography>利用可能サービス</HeadlineTypography>
        <CustomerServicesCheckboxes errors={errors} control={control} />

        <HeadlineTypography>GoogleChatのWebhookURL(Space)</HeadlineTypography>
        <SpaceWebhookUrlTextField
          errors={errors}
          {...register("spaceWebhookUrl")}
        />

        <Box margin="0.5em">
          <SubmitButton disabled={mutation.isPending} />
        </Box>
      </Box>
    </>
  );
};
