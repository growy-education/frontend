import { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { QuestionTitle } from "./QuestionTitle";
import SendIcon from "@mui/icons-material/Send";
import { Role } from "../types/role.enum";
import { useParams } from "react-router-dom";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { User } from "../types/user.class";

export const UserEdit = () => {
  const [user, setUser] = useState<User | null>(null);
  const [screenType, setScreenType] = useState<"edit" | "check">("edit");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setMemo] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<(typeof Role)[keyof typeof Role]>(
    Role.CUSTOMER
  );

  const { axiosConfig } = useContext(AxiosContext);

  const { userId } = useParams();
  useEffect(() => {
    console.log("param userId:", userId);
    axios
      .create(axiosConfig)
      .get(`/users/${userId}`)
      .then((response) => {
        const user = plainToInstance(User, response.data);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, userId]);

  if (!!!user) {
    return <CircularProgress />;
  }

  return (
    <>
      <Typography variant="h4">ユーザー情報を編集する</Typography>
      <QuestionTitle title="ユーザー名" />
      <Typography>現在のユーザー名：{user.username}</Typography>
      <TextField
        fullWidth
        id="username"
        label="ユーザー名"
        helperText="4文字以上20文字以下で設定する。"
        onChange={(event) => setUsername(event.target.value)}
      />

      <QuestionTitle title="メールアドレス" />
      <TextField
        fullWidth
        id="email"
        autoComplete="email"
        label="メールアドレス"
        helperText="@growy.educationが望ましい。"
        onChange={(event) => setEmail(event.target.value)}
      />

      <QuestionTitle title="パスワード" />
      <TextField
        fullWidth
        id="user"
        label="パスワード"
        helperText="英数小文字・大文字、そして記号を含む8文字以上。"
        onChange={(event) => setMemo(event.target.value)}
      />
      <QuestionTitle title="ロール" />
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={role}
        name="radio-buttons-group"
      >
        <FormControlLabel
          value={Role.CUSTOMER}
          control={<Radio />}
          label="生徒"
        />
        <FormControlLabel
          value={Role.TEACHER}
          control={<Radio />}
          label="講師"
        />
      </RadioGroup>
      <Box margin="0.5em">
        <Button
          color="primary"
          variant="contained"
          endIcon={<SendIcon />}
          onClick={() => console.log("送信しちゃうよ")}
        >
          更新する
        </Button>
      </Box>
    </>
  );
};
