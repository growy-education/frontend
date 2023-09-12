import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import SendIcon from "@mui/icons-material/Send";
import { IsNotEmpty, IsNumberString, IsString, Matches } from "class-validator";
import { useNavigate } from "react-router-dom";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { User } from "../../dto/user.class";
import { Role } from "../../dto/enum/role.enum";
import { FirstNameTextField } from "../../components/customers/FirstNameTextField";
import { FirstNameKanaTextField } from "../../components/customers/FirstNameKanaTextField";
import { LastNameTextField } from "../../components/customers/LastNameTextField";
import { LastNameKanaTextField } from "../../components/customers/LastNameKanaTextField";
import { ChatworkAccountIdTextField } from "../../components/teachers/chatworkAccountIdTextField";

class CreateTeacherDto {
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
  @IsNotEmpty({ message: "お名前（フリガナ）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  firstNameKana: string;

  @IsString()
  @IsNotEmpty({ message: "苗字を入力してください" })
  @Matches(/^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー－]+$/u, {
    message: "日本語で入力してください",
  })
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: "苗字（フリガナ）を入力してください" })
  @Matches(/^[ァ-ヶー]*$/, { message: "カタカナで入力してください" })
  lastNameKana: string;

  @IsNotEmpty({ message: "ChatworkIDを入力してください" })
  @IsNumberString({}, { message: "ChatworkIDは数字で入力してください" })
  chatworkAccountId: string;
}

export const TeacherNew = () => {
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const resolver = classValidatorResolver(CreateTeacherDto);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateTeacherDto>({ resolver });

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
        console.log(response.data);
        const users = response.data.map((userJson: string) =>
          plainToInstance(User, userJson)
        );
        setUsers(users);
      })
      .catch((error) => console.log("error occurred at UsersList.tsx", error));
  }, [axiosConfig]);

  const onSubmit: SubmitHandler<CreateTeacherDto> = (data) => {
    console.log("呼ばれた!");
    console.log(data);
    axios
      .create(axiosConfig)
      .post("teachers", {
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
    navigate("/teachers"); // 詳細画面への遷移
  };

  return (
    <>
      <Typography variant="h4">講師を新規作成する</Typography>

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

        <HeadlineTypography>ChatworkAccountID</HeadlineTypography>
        <ChatworkAccountIdTextField
          errors={errors}
          {...register("chatworkAccountId")}
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
        <DialogTitle>講師が作成されました</DialogTitle>
        <DialogContent>
          <DialogContentText>
            講師の一覧画面へと遷移しますか？
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
