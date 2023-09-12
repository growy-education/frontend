import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import SendIcon from "@mui/icons-material/Send";
import { Relationship } from "../../dto/enum/relationship.enum";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
} from "class-validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useNavigate } from "react-router-dom";
import { User } from "../../dto/user.class";
import { plainToInstance } from "class-transformer";
import axios from "axios";
import { Role } from "../../dto/enum/role.enum";
import { FirstNameTextField } from "../../components/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/customers/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/customers/LastNameTextField";
import { LastNameKanaTextField } from "../../components/customers/LastNameKanaTextField";
import { SpaceWebhookUrlTextField } from "../../components/customers/SpaceWebhookUrlTextField";
import { CustomerService } from "../../dto/enum/customer-service.enum";
import { PageTitleTypography } from "../../components/components/Typography/PageTitleTypography";

class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: "ユーザーを選択してください" })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: "お名前を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: "お名前（読み仮名）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  firstNameKana: string;

  @IsString()
  @IsNotEmpty({ message: "苗字を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: "苗字（読み仮名）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  lastNameKana: string;

  @IsEnum(Relationship)
  relationship: Relationship;

  @IsArray()
  @IsEnum(CustomerService, { each: true })
  services: CustomerService[];

  @IsUrl(
    { protocols: ["https"], host_whitelist: ["chat.googleapis.com"] },
    { message: "Invalid host URL" }
  )
  spaceWebhookUrl: string;
}

export const CustomerNewPage = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const resolver = classValidatorResolver(CreateCustomerDto);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<CreateCustomerDto>({
    resolver,
    defaultValues: {
      relationship: Relationship.FATHER,
    },
  });

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("users", {
        params: {
          role: Role.PENDING,
        },
      })
      .then((response) => {
        const users = response.data.map((userJson: string) =>
          plainToInstance(User, userJson)
        );
        setUsers(users);
      })
      .catch((error) => console.log(`error occured at ${__dirname}, ${error}`));
  }, [axiosConfig]);

  const onSubmit: SubmitHandler<CreateCustomerDto> = (data) => {
    axios
      .create(axiosConfig)
      .post("customers", {
        ...data,
      })
      .then((response) => {
        console.log(response.status);
        setOpen(true);
      })
      .catch((error) => console.log(error));
  };

  const CustomerServices = [
    { id: CustomerService.QUESTION_ANSWER, name: "質問回答" },
    { id: CustomerService.SELF_STUDY_ROOM, name: "オンライン自習室" },
    { id: CustomerService.TEST_CORRECTION, name: "模試・過去問検索" },
    { id: CustomerService.TEACHING, name: "ティーチング" },
    { id: CustomerService.COACHING, name: "コーチング" },
  ];

  // 確認ダイアログ
  const [open, setOpen] = useState(false);
  // ダイアログの確認ボタンを押すと、ユーザーの一覧画面へと遷移する
  const handleConfirm = () => {
    setOpen(false);
    navigate("/customers"); // 詳細画面への遷移
  };

  return (
    <>
      <PageTitleTypography>保護者を新規作成する</PageTitleTypography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <HeadlineTypography>連携ユーザー</HeadlineTypography>
        <Select
          required
          fullWidth
          id="userId"
          error={!!errors.userId}
          {...register("userId")}
        >
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.email}
            </MenuItem>
          ))}
        </Select>
        <HeadlineTypography>名前</HeadlineTypography>
        <FirstNameTextField errors={errors} {...register("firstName")} />

        <HeadlineTypography>名前（読み仮名）</HeadlineTypography>
        <FirstNameKanaTextField
          errors={errors}
          {...register("firstNameKana")}
        />

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

        <Box margin="0.5em">
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
          >
            送信
          </Button>
        </Box>
      </Box>

      {/* ダイアログ */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>カスタマーが作成されました</DialogTitle>
        <DialogContent>
          <DialogContentText>
            カスタマーの一覧画面へと遷移しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            確認
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
