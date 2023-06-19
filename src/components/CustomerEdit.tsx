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
import { Role } from "../types/role.type";
import SendIcon from "@mui/icons-material/Send";
import { Relationship } from "../types/relationship.enum";

export const CustomerEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [relationship, setRelationship] = useState<Relationship>(
    Relationship.FATHER
  );

  const { axiosConfig } = useContext(AxiosContext);

  return (
    <>
      <Typography variant="h4">ユーザーを更新する</Typography>
      <QuestionTitle title="お名前" />
      <TextField
        fullWidth
        id="firstName"
        label="お名前"
        helperText=""
        onChange={(event) => setFirstName(event.target.value)}
      />

      <QuestionTitle title="お名前（読み仮名）" />
      <TextField
        fullWidth
        id="firstNameKana"
        label="お名前（読み仮名）"
        helperText="@growy.educationが望ましい。"
        onChange={(event) => setFirstNameKana(event.target.value)}
      />

      <QuestionTitle title="苗字" />
      <TextField
        id="lastName"
        fullWidth
        label="苗字"
        helperText="英数小文字・大文字、そして記号を含む8文字以上。"
        onChange={(event) => setLastName(event.target.value)}
      />

      <QuestionTitle title="苗字（読み仮名）" />
      <TextField
        fullWidth
        id="lastNameKana"
        label="パスワード"
        helperText="英数小文字・大文字、そして記号を含む8文字以上。"
        onChange={(event) => setLastNameKana(event.target.value)}
      />

      <QuestionTitle title="続柄" />
      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={relationship}
        name="radio-buttons-group"
      >
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
