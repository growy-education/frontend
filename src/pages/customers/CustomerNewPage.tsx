import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import SendIcon from "@mui/icons-material/Send";
import { Relationship } from "../../dto/enum/relationship.enum";
import { IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useNavigate } from "react-router-dom";
import { User } from "../../dto/user.class";
import { plainToInstance } from "class-transformer";
import axios from "axios";
import { Role } from "../../dto/enum/role.enum";

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
}

export const CustomerNewPage = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

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

  const [users, setUsers] = useState<User[]>([]);

  console.log(errors);

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
    console.log("呼ばれた!");
    console.log(data);
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

  // 確認ダイアログ
  const [open, setOpen] = useState(false);
  // ダイアログの確認ボタンを押すと、ユーザーの一覧画面へと遷移する
  const handleConfirm = () => {
    setOpen(false);
    navigate("/customers"); // 詳細画面への遷移
  };

  return (
    <>
      <Typography variant="h4">保護者を新規作成する</Typography>
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
        <TextField
          fullWidth
          id="firstName"
          label="名前"
          error={!!errors.firstName}
          helperText={!!errors.firstName ? errors.firstName.message : ""}
          {...register("firstName")}
        />

        <HeadlineTypography>名前（読み仮名）</HeadlineTypography>
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

        <HeadlineTypography>苗字</HeadlineTypography>
        <TextField
          id="lastName"
          fullWidth
          label="苗字"
          error={!!errors.lastName}
          helperText={
            !!errors.lastName
              ? errors.lastName.message
              : "苗字を入力してください"
          }
          {...register("lastName")}
        />

        <HeadlineTypography>苗字（読み仮名）</HeadlineTypography>
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
