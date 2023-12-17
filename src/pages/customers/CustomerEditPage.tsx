import { useEffect } from "react";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { Relationship } from "../../features/customers/types/relationship.enum";

import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { LoadingBox } from "../../features/LoadingData";
import { HeaderBox } from "../../components/Layout/HeaderBox";
import { FirstNameTextField } from "../../components/Element/TextField/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/Element/TextField/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/Element/TextField/LastNameTextField";
import { LastNameKanaTextField } from "../../components/Element/TextField/LastNameKanaTextField";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { CancelEditButton } from "../../components/Element/Button/CancelEditButton";
import { SpaceWebhookUrlTextField } from "../../features/customers/SpaceWebhookUrlTextField";
import { SaveEditButton } from "../../components/Element/Button/SaveEditButton";
import { UpdateCustomerDto } from "../../features/customers/types/update-customer.dto";
import { useUpdateCustomer } from "../../features/customers/api/updateCustomer";
import { useCustomer } from "../../features/customers/api/getCustomer";
import { RelationshipRadioGroup } from "../../features/customers/RelationshipRadioGroup";
import { CustomerServicesCheckboxes } from "../../features/customers/ServicesCheckboxes";

export const CustomerEditPage = () => {
  const { customerId } = useParams();
  const { data: customer } = useCustomer({ customerId });
  const mutation = useUpdateCustomer();

  const resolver = classValidatorResolver(UpdateCustomerDto);
  const {
    reset,
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateCustomerDto>({
    resolver,
    defaultValues: {
      firstName: customer?.firstName || "",
      firstNameKana: customer?.firstNameKana || "",
      lastName: customer?.lastName || "",
      lastNameKana: customer?.lastNameKana || "",
      relationship: customer?.relationship || Relationship.FATHER,
      services: customer?.services || [],
    },
  });

  useEffect(() => {
    if (customer) {
      setValue("firstName", customer?.firstName);
      setValue("firstNameKana", customer?.firstNameKana);
      setValue("lastName", customer?.lastName);
      setValue("lastNameKana", customer?.lastNameKana);
      setValue("relationship", customer?.relationship);
      setValue("spaceWebhookUrl", customer?.spaceWebhookUrl);
      setValue("services", customer?.services);
    }
  }, [setValue, customer]);

  const onSubmit: SubmitHandler<UpdateCustomerDto> = (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: customerId, dto: data });
  };

  if (!!!customer) {
    return <LoadingBox message="保護者情報を取得中です" />;
  }

  return (
    <>
      <PageTitleTypography>保護者情報を編集する</PageTitleTypography>

      <HeaderBox>
        <CancelEditButton onClick={() => reset()} />
        <SaveEditButton onClick={handleSubmit(onSubmit)} />
      </HeaderBox>

      <HeadlineTypography>苗字</HeadlineTypography>
      <LastNameTextField errors={errors} {...register("lastName")} />

      <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
      <LastNameKanaTextField errors={errors} {...register("lastNameKana")} />

      <HeadlineTypography>名前</HeadlineTypography>
      <FirstNameTextField errors={errors} {...register("firstName")} />

      <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
      <FirstNameKanaTextField errors={errors} {...register("firstNameKana")} />

      <HeadlineTypography>続柄</HeadlineTypography>
      <RelationshipRadioGroup errors={errors} control={control} />

      <HeadlineTypography>利用可能サービス</HeadlineTypography>
      <CustomerServicesCheckboxes errors={errors} control={control} />

      <HeadlineTypography>GoogleChatのWebhookURL(Space)</HeadlineTypography>
      <SpaceWebhookUrlTextField
        errors={errors}
        {...register("spaceWebhookUrl")}
      />
    </>
  );
};
