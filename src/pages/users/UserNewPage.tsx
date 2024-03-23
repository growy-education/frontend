import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { CreateUserDto } from "../../features/users/types/create-user.dto";
import { useCreateUser } from "../../features/users/api/createUser";
import { useForm } from "react-hook-form";
import { Role } from "../../features/users/types/role.enum";
import { useSearchParams } from "react-router-dom";
import { flatten } from "flat";
import dayjs from "dayjs";
import { CustomerNew } from "../../features/customers/CustomerNew";
import { StudentNew } from "../../features/students/StudentNew";
import { UserNew } from "../../features/users/UserNew";
import { TeacherNew } from "../../features/teachers/TeacherNew";
import { UserNewConfirmation } from "../../features/users/UserNewConfirmation";
import { SubmitButton } from "../../features/SubmitButton";

const getSteps = (role: Role) => {
  if (role === Role.CUSTOMER) {
    return ["ユーザー情報", "保護者情報", "生徒情報", "入力内容の確認"];
  }
  if (role === Role.TEACHER) {
    return ["ユーザー情報", "講師情報", "入力内容の確認"];
  }
  return ["ユーザー情報", "保護者情報", "生徒情報", "入力内容の確認"];
};

export const UserNewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeStep, setActiveStep] = React.useState<number>(0);

  const resolver = classValidatorResolver(CreateUserDto);
  const {
    formState: { errors },
    handleSubmit,
    register,
    trigger,
    getValues,
    control,
    setValue,
    watch,
  } = useForm<CreateUserDto>({
    resolver,
    defaultValues: {
      password: "Test123!",
    },
  });

  React.useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    Object.keys(params).forEach((key) => {
      if (key === "studentDto.birthday") {
        setValue(key, dayjs(params[key]));
      } else {
        setValue(key as any, params[key]);
      }
    });
  }, [searchParams, setValue]);

  const mutation = useCreateUser();

  const handleNext = async () => {
    const queryParams = new URLSearchParams();
    Object.entries(flatten(getValues())).forEach(([key, value]) => {
      if (!key.includes("birthday")) {
        queryParams.set(key, value);
      }
    });
    queryParams.set(
      "studentDto.birthday",
      getValues("studentDto.birthday")?.toString()
    );
    setSearchParams(queryParams);

    let result: boolean;
    if (activeStep === 0) {
      result = await trigger([
        "role",
        "username",
        "password",
        "email",
        "phone",
        "chatWebhookUrl",
        "role",
      ]);
    }
    if (activeStep === 1) {
      result = await trigger("customerDto");
    }
    if (activeStep === 2) {
      result = await trigger("studentDto");
    }
    if (result) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    console.log(errors);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmit = (data: CreateUserDto) => {
    mutation.mutate(data);
  };

  watch("role");

  return (
    <>
      <PageTitleTypography>ユーザーを作成する</PageTitleTypography>
      <Box my={4}>
        <Stepper activeStep={activeStep}>
          {getSteps(getValues("role"))?.map((label, _index) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box my={4}>
          {activeStep === 0 && (
            <UserNew register={register} control={control} errors={errors} />
          )}
          {getValues("role") === Role.CUSTOMER && (
            <>
              {activeStep === 1 && (
                <CustomerNew
                  register={register}
                  control={control}
                  errors={errors}
                />
              )}
              {activeStep === 2 && (
                <StudentNew
                  register={register}
                  control={control}
                  errors={errors}
                />
              )}
              {activeStep === 3 && <UserNewConfirmation dto={getValues()} />}
            </>
          )}
          {getValues("role") === Role.TEACHER && (
            <>
              {activeStep === 1 && (
                <TeacherNew
                  register={register}
                  control={control}
                  errors={errors}
                />
              )}
              {activeStep === 2 && <UserNewConfirmation dto={getValues()} />}
            </>
          )}
          <Box sx={{ my: 4, display: "flex", flexDirection: "row" }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              戻る
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              disabled={
                (getValues("role") === Role.CUSTOMER && activeStep === 3) ||
                (getValues("role") === Role.TEACHER && activeStep === 2)
              }
            >
              次へ
            </Button>
          </Box>

          {((getValues("role") === Role.CUSTOMER && activeStep === 3) ||
            (getValues("role") === Role.TEACHER && activeStep === 2)) && (
            <>
              <Box sx={{ my: 4, display: "flex", justifyContent: "center" }}>
                <SubmitButton
                  onClick={handleSubmit(onSubmit)}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "作成中..." : "作成する"}
                </SubmitButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
