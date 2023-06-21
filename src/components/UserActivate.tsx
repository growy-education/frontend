import { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user.class";
import axios from "axios";
import { QuestionTitle } from "./QuestionTitle";
import { plainToInstance } from "class-transformer";
import { ExpandMore, Lock } from "@mui/icons-material";
import { Role } from "../types/role.enum";

export const UserActivate = () => {
  const [userRole, setUserRole] = useState<Role.CUSTOMER | Role.TEACHER>(
    Role.CUSTOMER
  );
  const [user, setUser] = useState<null | User>(null);
  const [open, setOpen] = useState(false);

  const { axiosConfig } = useContext(AxiosContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  const checkUserData = () => {
    if (userRole === Role.CUSTOMER) {
      if (!!user?.customer && !!user?.student) {
        setOpen(true);
      }
    }
    if (userRole === Role.TEACHER) {
      if (!!user?.teacher) {
        setOpen(true);
      }
    }
  };

  const handleConfirm = () => {
    axios
      .create(axiosConfig)
      .put(`/users/${userId}/activation`, {
        role: userRole,
      })
      .then((response) => {
        setOpen(false);
        navigate("/users");
      });
  };

  useEffect(() => {
    console.log("param userId:", userId);
    axios
      .create(axiosConfig)
      .get(`/users/${userId}/activation`)
      .then((response) => {
        console.log(response.data);
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

  const { id, createdAt, updatedAt, username, email, phone, role } = user;

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent={"space-around"} margin={2}>
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          margin={1}
        >
          <Button
            variant="contained"
            endIcon={<Lock />}
            onClick={() => checkUserData()}
          >
            ユーザーを有効化する
          </Button>
        </Box>
        <Box>
          <FormControl>
            <FormLabel>アカウントタイプ</FormLabel>
            <RadioGroup
              row
              defaultValue={userRole}
              onChange={(event) => {
                if (event.target.value === Role.CUSTOMER) {
                  setUserRole(event.target.value);
                }
                if (event.target.value === Role.TEACHER) {
                  setUserRole(event.target.value);
                }
              }}
            >
              <FormControlLabel
                value={Role.CUSTOMER}
                control={<Radio />}
                label="保護者"
              />
              <FormControlLabel
                value={Role.TEACHER}
                control={<Radio />}
                label="講師"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Box my={3}>
        <QuestionTitle title="ID" />
        <Typography>{id}</Typography>
        <QuestionTitle title="作成日時" />
        <Typography>{createdAt.toDateString()}</Typography>
        <QuestionTitle title="更新日時" />
        <Typography>{updatedAt.toDateString()}</Typography>
        <QuestionTitle title="ユーザー名" />
        <Typography>{username}</Typography>
        <QuestionTitle title="メールアドレス" />
        <Typography>{email}</Typography>
        <QuestionTitle title="電話番号" />
        <Typography>{phone}</Typography>
        <QuestionTitle title="ロール" />
        <Typography>{role}</Typography>
      </Box>
      <Box>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} id="customer">
            <Typography>Customer情報</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {user ? (
              user?.customer ? (
                <>
                  <QuestionTitle title="ID" />
                  <Typography>{user.customer.id}</Typography>
                  <QuestionTitle title="作成日時" />
                  <Typography>
                    {user.customer.createdAt.toDateString()}
                  </Typography>
                  <QuestionTitle title="更新日時" />
                  <Typography>
                    {user.customer.updatedAt.toDateString()}
                  </Typography>
                  <QuestionTitle title="名前" />
                  <Typography>{user.customer.firstName}</Typography>
                  <QuestionTitle title="名前（読み仮名）" />
                  <Typography>{user.customer.firstNameKana}</Typography>
                  <QuestionTitle title="苗字" />
                  <Typography>{user.customer.lastName}</Typography>
                  <QuestionTitle title="苗字（読み仮名）" />
                  <Typography>{user.customer.lastNameKana}</Typography>
                  <QuestionTitle title="続柄" />
                  <Typography>{user.customer.relationship}</Typography>
                </>
              ) : (
                <Typography>カスタマー情報がありません</Typography>
              )
            ) : (
              <CircularProgress />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} id="student">
            <Typography>Student情報</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {user ? (
              user?.student ? (
                <>
                  <QuestionTitle title="ID" />
                  <Typography>{user.student.id}</Typography>
                  <QuestionTitle title="作成日時" />
                  <Typography>
                    {user.student.createdAt.toDateString()}
                  </Typography>
                  <QuestionTitle title="更新日時" />
                  <Typography>
                    {user.student.updatedAt.toDateString()}
                  </Typography>
                  <QuestionTitle title="名前" />
                  <Typography>{user.student.firstName}</Typography>
                  <QuestionTitle title="名前（読み仮名）" />
                  <Typography>{user.student.firstNameKana}</Typography>
                  <QuestionTitle title="苗字" />
                  <Typography>{user.student.lastName}</Typography>
                  <QuestionTitle title="苗字（読み仮名）" />
                  <Typography>{user.student.lastNameKana}</Typography>
                  <QuestionTitle title="性別" />
                  <Typography>{user.student.gender}</Typography>
                </>
              ) : (
                <Typography>生徒情報がありません</Typography>
              )
            ) : (
              <CircularProgress />
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />} id="teacher">
            <Typography>Teacher情報</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {user ? (
              user?.teacher ? (
                <>
                  <QuestionTitle title="ID" />
                  <Typography>{user.teacher.id}</Typography>
                  <QuestionTitle title="作成日時" />
                  <Typography>
                    {user.teacher.createdAt.toDateString()}
                  </Typography>
                  <QuestionTitle title="更新日時" />
                  <Typography>
                    {user.teacher.updatedAt.toDateString()}
                  </Typography>
                  <QuestionTitle title="名前" />
                  <Typography>{user.teacher.firstName}</Typography>
                  <QuestionTitle title="名前（読み仮名）" />
                  <Typography>{user.teacher.firstNameKana}</Typography>
                  <QuestionTitle title="苗字" />
                  <Typography>{user.teacher.lastName}</Typography>
                  <QuestionTitle title="苗字（読み仮名）" />
                  <Typography>{user.teacher.lastNameKana}</Typography>
                  <QuestionTitle title="ChatworkAccountID" />
                  <Typography>{user.teacher.chatworkAccountId}</Typography>
                </>
              ) : (
                <Typography>講師情報がありません</Typography>
              )
            ) : (
              <CircularProgress />
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
      {/* ダイアログ */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>アカウントを有効化しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {userRole}アカウントが作成されます
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
    </Container>
  );
};
