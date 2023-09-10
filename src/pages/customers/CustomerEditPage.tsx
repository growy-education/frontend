import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Snackbar,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Relationship } from "../../dto/enum/relationship.enum";
import {
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
import axios, { isAxiosError } from "axios";
import { plainToInstance } from "class-transformer";
import { SubmitButton } from "../../components/SubmitButton";
import { LoadingBox } from "../../components/LoadingData";
import { HeadEditBox } from "../../components/HeadEditBox";
import { FirstNameTextField } from "../../components/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/customers/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/customers/LastNameTextField";
import { LastNameKanaTextField } from "../../components/customers/LastNameKanaTextField";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";
import { CancelEditButton } from "../../components/components/CancelEditButton";
import { SpaceWebhookUrlTextField } from "../../components/customers/SpaceWebhookUrlTextField";

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
  @IsUrl(
    { protocols: ["https"], host_whitelist: ["chat.googleapis.com"] },
    { message: "Invalid host URL" }
  )
  spaceWebhookUrl: string;
}

export const CustomerEditPage = () => {
  const { axiosConfig } = useAxiosConfig();
  const { customerId } = useParams();

  const [customer, setCustomer] = useState<Customer | null>(null);

  // 結果を示すオブジェクトを作成する
  const [result, setResult] = useState({
    open: false,
    success: false,
    title: "",
    message: "",
  });

  const navigate = useNavigate();

  const resolver = classValidatorResolver(UpdateCustomerDto);
  const {
    register,
    setValue,
    trigger,
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
    },
  });

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get(`/customers/${customerId}`)
      .then((response) => {
        const customer = plainToInstance(Customer, response.data);
        setCustomer(customer);
        setValue("firstName", customer.firstName);
        setValue("firstNameKana", customer.firstNameKana);
        setValue("lastName", customer.lastName);
        setValue("lastNameKana", customer.lastNameKana);
        setValue("relationship", customer.relationship);
        setValue("spaceWebhookUrl", customer.spaceWebhookUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, customerId]);

  const onSubmit: SubmitHandler<UpdateCustomerDto> = (data) => {
    axios
      .create(axiosConfig)
      .put(`customers/${customerId}`, data)
      .then((response) => {
        navigate(`/customers/${customerId}`);
      })
      .catch((error: unknown) => {
        if (isAxiosError(error)) {
          // サーバーからの返答がある
          if (error.response) {
            return setResult({
              open: true,
              success: false,
              title: "",
              message: "保護者情報に誤りがあります",
            });
          }
          // サーバーからの返答がない
          if (error.request) {
            return setResult({
              open: true,
              success: false,
              title: "",
              message:
                "サーバーからの返答がありません。ネットワーク接続を確認してください",
            });
          }
        }

        // よくわからんエラーのとき
        return setResult({
          open: true,
          success: false,
          title: "",
          message: "予期せぬエラーが発生しました",
        });
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
        <SubmitButton onClick={handleSubmit(onSubmit)} trigger={trigger} />
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

      <HeadlineTypography>GoogleChatのWebhookURL(Space)</HeadlineTypography>
      <SpaceWebhookUrlTextField
        errors={errors}
        {...register("spaceWebhookUrl")}
      />

      {result.open && !result.success && (
        <Snackbar
          open={result.open && !result.success}
          autoHideDuration={6000}
          onClose={() =>
            setResult({
              open: false,
              success: false,
              title: "",
              message: "",
            })
          }
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() =>
              setResult({
                open: false,
                success: false,
                title: "",
                message: "",
              })
            }
            severity="error"
            sx={{ width: "100%" }}
          >
            {result.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};
