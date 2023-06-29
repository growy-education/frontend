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
import { Title } from "../../components/QuestionTitle";
import { Relationship } from "../../types/relationship.enum";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Customer } from "../../types/customer.class";
import axios, { isAxiosError } from "axios";
import { plainToInstance } from "class-transformer";
import { SubmitButton } from "../../components/SubmitButton";

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, customerId]);

  const onSubmit: SubmitHandler<UpdateCustomerDto> = (data) => {
    console.log(data);
    let updatedData: UpdateCustomerDto = {};
    for (const key in data) {
      if (data[key] !== customer[key]) {
        updatedData[key] = data[key];
      }
    }
    console.log(updatedData);
    axios
      .create(axiosConfig)
      .put(`customers/${customerId}`, {
        ...updatedData,
      })
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

  if (!customer) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4">保護者情報を更新する</Typography>

      <Title title="名前" />
      <TextField
        fullWidth
        id="firstName"
        label="名前"
        error={!!errors.firstName}
        helperText={
          !!errors.firstName
            ? errors.firstName.message
            : "名前を入力してください"
        }
        {...register("firstName")}
      />

      <Title title="名前（読み仮名）" />
      <TextField
        fullWidth
        id="firstNameKana"
        label="名前（読み仮名）"
        error={!!errors.firstNameKana}
        helperText={
          !!errors.firstNameKana
            ? errors.firstNameKana.message
            : "カタカナで入力してください"
        }
        {...register("firstNameKana")}
      />

      <Title title="苗字" />
      <TextField
        id="lastName"
        fullWidth
        label="苗字"
        error={!!errors.lastName}
        helperText={
          !!errors.lastName ? errors.lastName.message : "苗字を入力してください"
        }
        {...register("lastName")}
      />

      <Title title="苗字（読み仮名）" />
      <TextField
        fullWidth
        id="lastNameKana"
        label="苗字（読み仮名）"
        error={!!errors.lastName}
        helperText={
          !!errors.lastNameKana
            ? errors.lastNameKana.message
            : "カタカナで入力してください"
        }
        {...register("lastNameKana")}
      />

      <Title title="続柄" />
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

      <Box margin="0.5em">
        <SubmitButton onClick={handleSubmit(onSubmit)} trigger={trigger} />
        <Button
          type="submit"
          color="inherit"
          variant="contained"
          onClick={() => navigate(`/customers/${customerId}`)}
        >
          キャンセル
        </Button>
      </Box>
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
