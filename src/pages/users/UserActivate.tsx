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
  FormLabel,
  Button,
  FormHelperText,
} from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/user.class";
import axios, { isAxiosError } from "axios";
import { Title } from "../../components/QuestionTitle";
import { plainToInstance } from "class-transformer";
import { ExpandMore, Lock } from "@mui/icons-material";
import { Role } from "../../types/role.enum";
import { IsEnum, IsNotEmpty } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ResultSnackbar } from "../../components/ResultSnackbar";

class ActivateUserDto {
  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}

export const UserActivate = () => {
  const [user, setUser] = useState<null | User>(null);
  const [result, setResult] = useState({
    open: false,
    success: false,
    title: "",
    message: "",
  });

  const resolver = classValidatorResolver(ActivateUserDto);
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<ActivateUserDto>({
    resolver,
    defaultValues: {
      role: Role.CUSTOMER,
    },
  });

  const { axiosConfig } = useContext(AxiosContext);
  const { userId } = useParams();
  const navigate = useNavigate();

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

  const onSubmit: SubmitHandler<ActivateUserDto> = (data) => {
    axios
      .create(axiosConfig)
      .put(`/users/${userId}/activation`, {
        role: getValues("role"),
      })
      .then((response) => {
        navigate(`/users/${userId}`);
      })
      .catch((error) => {
        if (isAxiosError(error)) {
          // サーバーからの返答がある
          if (error.response) {
            // CustomerデータやStudentデータ、もしくはTeacherデータに不備がある
            if (error.response.status === 412) {
              console.log(error.message);
              return setResult({
                open: true,
                success: false,
                title: "ユーザーの有効化に失敗しました",
                message:
                  "保護者情報や講師情報など、ユーザー情報の登録が完了していません。",
              });
            }
            return setResult({
              open: true,
              success: false,
              title: "ユーザーの有効化に失敗しました",
              message: "ユーザーのデータに誤りがあります",
            });
          }
          // サーバーからの返答がない
          if (error.request) {
            return setResult({
              open: true,
              success: false,
              title: "ユーザーの有効化に失敗しました",
              message:
                "サーバーからの返答がありません。ネットワーク接続を確認してください",
            });
          }
        }

        // よくわからんエラーのとき
        return setResult({
          open: true,
          success: false,
          title: "ユーザーの有効化に失敗しました",
          message: "予期せぬエラーが発生しました。",
        });
      });
  };

  if (!!!user) {
    return <CircularProgress />;
  }

  const { id, createdAt, updatedAt, username, email, phone, role } = user;

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent={"space-around"} margin={2}>
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            margin={1}
          >
            <Button type="submit" variant="contained" endIcon={<Lock />}>
              ユーザーを有効化する
            </Button>
          </Box>
          <Box>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel>アカウントタイプ</FormLabel>
                  <RadioGroup row name="radio-buttons-group" {...field}>
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
                    <FormHelperText error={!!errors.role}>
                      {errors.role?.message}
                    </FormHelperText>
                  </RadioGroup>
                </>
              )}
            />
          </Box>
        </Box>
        <Box my={3}>
          <Title title="ID" />
          <Typography>{id}</Typography>
          <Title title="作成日時" />
          <Typography>{createdAt.toDateString()}</Typography>
          <Title title="更新日時" />
          <Typography>{updatedAt.toDateString()}</Typography>
          <Title title="ユーザー名" />
          <Typography>{username}</Typography>
          <Title title="メールアドレス" />
          <Typography>{email}</Typography>
          <Title title="電話番号" />
          <Typography>{phone}</Typography>
          <Title title="ロール" />
          <Typography>{role}</Typography>
        </Box>
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
                  <Title title="ID" />
                  <Typography>{user.customer.id}</Typography>
                  <Title title="作成日時" />
                  <Typography>
                    {user.customer.createdAt.toDateString()}
                  </Typography>
                  <Title title="更新日時" />
                  <Typography>
                    {user.customer.updatedAt.toDateString()}
                  </Typography>
                  <Title title="名前" />
                  <Typography>{user.customer.firstName}</Typography>
                  <Title title="名前（読み仮名）" />
                  <Typography>{user.customer.firstNameKana}</Typography>
                  <Title title="苗字" />
                  <Typography>{user.customer.lastName}</Typography>
                  <Title title="苗字（読み仮名）" />
                  <Typography>{user.customer.lastNameKana}</Typography>
                  <Title title="続柄" />
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
                  <Title title="ID" />
                  <Typography>{user.student.id}</Typography>
                  <Title title="作成日時" />
                  <Typography>
                    {user.student.createdAt.toDateString()}
                  </Typography>
                  <Title title="更新日時" />
                  <Typography>
                    {user.student.updatedAt.toDateString()}
                  </Typography>
                  <Title title="名前" />
                  <Typography>{user.student.firstName}</Typography>
                  <Title title="名前（読み仮名）" />
                  <Typography>{user.student.firstNameKana}</Typography>
                  <Title title="苗字" />
                  <Typography>{user.student.lastName}</Typography>
                  <Title title="苗字（読み仮名）" />
                  <Typography>{user.student.lastNameKana}</Typography>
                  <Title title="性別" />
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
                  <Title title="ID" />
                  <Typography>{user.teacher.id}</Typography>
                  <Title title="作成日時" />
                  <Typography>
                    {user.teacher.createdAt.toDateString()}
                  </Typography>
                  <Title title="更新日時" />
                  <Typography>
                    {user.teacher.updatedAt.toDateString()}
                  </Typography>
                  <Title title="名前" />
                  <Typography>{user.teacher.firstName}</Typography>
                  <Title title="名前（読み仮名）" />
                  <Typography>{user.teacher.firstNameKana}</Typography>
                  <Title title="苗字" />
                  <Typography>{user.teacher.lastName}</Typography>
                  <Title title="苗字（読み仮名）" />
                  <Typography>{user.teacher.lastNameKana}</Typography>
                  <Title title="ChatworkAccountID" />
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
      {result.open && !result.success && (
        <ResultSnackbar
          severity="error"
          open={result.open}
          title={result.title}
          message={result.message}
          onClose={() =>
            setResult({
              open: false,
              success: false,
              title: "",
              message: "",
            })
          }
        />
      )}
    </Container>
  );
};
