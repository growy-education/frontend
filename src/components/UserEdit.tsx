import { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { QuestionTitle } from "./QuestionTitle";
import { Role } from "../types/role.enum";
import SendIcon from "@mui/icons-material/Send";

export const UserEdit = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setMemo] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Role.CUSTOMER | Role.ADMIN>(Role.CUSTOMER);

  const { axiosConfig } = useContext(AxiosContext);

  return (
    <>
      <Typography variant="h4">ユーザーを更新する</Typography>
      <QuestionTitle title="ユーザー名" />
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
