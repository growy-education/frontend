import { useContext, useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Relationship } from "../../dto/enum/relationship.enum";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
} from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Customer } from "../../dto/customer.class";
import { LoadingBox } from "../../components/LoadingData";
import { HeadEditBox } from "../../components/HeadEditBox";
import { FirstNameTextField } from "../../components/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/customers/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/customers/LastNameTextField";
import { LastNameKanaTextField } from "../../components/customers/LastNameKanaTextField";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { CancelEditButton } from "../../components/components/CancelEditButton";
import { SpaceWebhookUrlTextField } from "../../components/customers/SpaceWebhookUrlTextField";
import { SaveEditButton } from "../../components/components/SaveEditButton";
import { CustomerContext } from "../../contexts/CustomerContextProvider";
import { CustomerService } from "../../dto/enum/customer-service.enum";

class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "お名前を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "お名前（読み仮名）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  firstNameKana?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "苗字を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: "苗字（読み仮名）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  lastNameKana?: string;

  @IsOptional()
  @IsEnum(Relationship)
  relationship?: Relationship;

  @IsOptional()
  @IsArray()
  @IsEnum(CustomerService, { each: true })
  services: CustomerService[];

  @IsOptional()
  @IsUrl(
    { protocols: ["https"], host_whitelist: ["chat.googleapis.com"] },
    { message: "Invalid host URL" }
  )
  spaceWebhookUrl: string;
}

const CustomerServices = [
  { id: CustomerService.QUESTION_ANSWER, name: "質問回答" },
  { id: CustomerService.SELF_STUDY_ROOM, name: "オンライン自習室" },
  { id: CustomerService.TEST_CORRECTION, name: "模試・過去問検索" },
  { id: CustomerService.TEACHING, name: "ティーチング" },
  { id: CustomerService.COACHING, name: "コーチング" },
];

export const CustomerEditPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { getCustomerById, updateCustomerById } = useContext(CustomerContext);

  const [customer, setCustomer] = useState<null | Customer>(null);
  const [sending, setSending] = useState(false);

  const resolver = classValidatorResolver(UpdateCustomerDto);
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
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
    getCustomerById(customerId)
      .then((found) => {
        if (found) {
          setCustomer(found);
          setValue("firstName", found?.firstName);
          setValue("firstNameKana", found?.firstNameKana);
          setValue("lastName", found?.lastName);
          setValue("lastNameKana", found?.lastNameKana);
          setValue("relationship", found?.relationship);
          setValue("spaceWebhookUrl", found?.spaceWebhookUrl);
          setValue("services", found?.services);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [customerId, getCustomerById, setValue]);

  const onSubmit: SubmitHandler<UpdateCustomerDto> = (data) => {
    if (sending) {
      return;
    }
    console.log(data.services);
    setSending(true);
    updateCustomerById(customerId, data)
      .then((customer) => {
        if (customer) {
          navigate(`/customers/${customerId}`);
        }
      })
      .finally(() => {
        setSending(false);
      });
  };

  if (!!!customer) {
    return <LoadingBox message="保護者情報を取得中です" />;
  }

  return (
    <>
      <PageTitleTypography>保護者情報を編集する</PageTitleTypography>

      <HeadEditBox>
        <CancelEditButton
          onClick={() => navigate(`/customers/${customerId}`)}
        />
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

      <HeadlineTypography>続柄</HeadlineTypography>
      <Controller
        name="relationship"
        control={control}
        render={({ field }) => (
          <RadioGroup row name="radio-buttons-group" {...field}>
            <FormControlLabel
              value={Relationship.FATHER}
              control={<Radio />}
              label="父親"
            />
            <FormControlLabel
              value={Relationship.MOTHER}
              control={<Radio />}
              label="母親"
            />
            <FormControlLabel
              value={Relationship.OTHER}
              control={<Radio />}
              label="その他"
            />
            <FormHelperText error={!!errors.relationship}>
              {errors.relationship?.message}
            </FormHelperText>
          </RadioGroup>
        )}
      />

      <HeadlineTypography>利用可能サービス</HeadlineTypography>
      <Controller
        name="services"
        control={control}
        defaultValue={[]}
        render={({ field: props }) => (
          <>
            {CustomerServices.map((item) => (
              <FormControlLabel
                label={item.name}
                control={
                  <Checkbox
                    {...props}
                    key={item.id}
                    checked={props.value.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        return props.onChange([...props.value, item.id]);
                      } else {
                        return props.onChange(
                          props.value.filter((removed) => removed !== item.id)
                        );
                      }
                    }}
                  />
                }
              />
            ))}
          </>
        )}
      />

      <HeadlineTypography>GoogleChatのWebhookURL(Space)</HeadlineTypography>
      <SpaceWebhookUrlTextField
        errors={errors}
        {...register("spaceWebhookUrl")}
      />
    </>
  );
};
