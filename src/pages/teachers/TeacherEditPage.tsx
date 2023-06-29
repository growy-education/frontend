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
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { Title } from "../../components/QuestionTitle";
import SendIcon from "@mui/icons-material/Send";
import { Relationship } from "../../types/relationship.enum";
import { TeacherStatus } from "../../types/teacher-status.enum";

export const TeacherEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [status, setStatus] = useState<TeacherStatus.INACTIVE>(
    TeacherStatus.INACTIVE
  );
  const [chatworkAccountId, setChatworkAccountId] = useState("");

  const { axiosConfig } = useContext(AxiosContext);

  return (
    <>
      <Typography variant="h4">講師を新規作成する</Typography>

      <Title title="名前" />
      <TextField
        fullWidth
        id="firstName"
        label="ユーザー名"
        helperText="4文字以上20文字以下で設定する。"
        onChange={(event) => setFirstName(event.target.value)}
      />

      <Title title="名前（読み仮名）" />
      <TextField
        fullWidth
        id="firstNameKana"
        label="名前（読み仮名）"
        helperText="@growy.educationが望ましい。"
        onChange={(event) => setFirstNameKana(event.target.value)}
      />

      <Title title="苗字" />
      <TextField
        id="lastName"
        fullWidth
        label="苗字"
        helperText="英数小文字・大文字、そして記号を含む8文字以上。"
        onChange={(event) => setLastName(event.target.value)}
      />

      <Title title="苗字（読み仮名）" />
      <TextField
        fullWidth
        id="lastNameKana"
        label="パスワード"
        helperText="英数小文字・大文字、そして記号を含む8文字以上。"
        onChange={(event) => setLastNameKana(event.target.value)}
      />

      <Title title="ChatworkID" />
      <TextField
        fullWidth
        id="chatworkId"
        label="パスワード"
        helperText="英数小文字・大文字、そして記号を含む8文字以上。"
        onChange={(event) => setChatworkAccountId(event.target.value)}
      />

      <Title title="ステータス" />
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={TeacherStatus.INACTIVE}
        name="radio-buttons-group"
      >
        <FormControlLabel
          value={Relationship.FATHER}
          control={<Radio />}
          label="現在対応不可能"
        />
        <FormControlLabel
          value={Relationship.MOTHER}
          control={<Radio />}
          label="現在対応可能"
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
