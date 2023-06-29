import { useContext, useEffect, useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Title } from "../../components/QuestionTitle";
import { Teacher } from "../../types/teacher.class";
import { plainToInstance } from "class-transformer";

export const TeacherDetail = () => {
  const [teacher, setTeacher] = useState<null | Teacher>(null);
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const { teacherId } = useParams();
  console.log(teacher);
  useEffect(() => {
    console.log("param teacherId:", teacherId);
    axios
      .create(axiosConfig)
      .get(`/teachers/${teacherId}`)
      .then((response) => {
        setTeacher(plainToInstance(Teacher, response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, teacherId]);

  if (!teacherId) {
    return <p>だめだこりゃ！</p>;
  }

  if (!!!teacher) {
    return <p>ローディングなう！</p>;
  }

  const {
    id,
    createdAt,
    updatedAt,
    firstName,
    firstNameKana,
    lastName,
    lastNameKana,
    status,
    chatworkAccountId,
    assignedQuestionsNumber,
  } = teacher;

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <Title title="ID" />
        <Typography>{id}</Typography>
        <Title title="作成日時" />
        <Typography>{createdAt.toDateString()}</Typography>
        <Title title="更新日時" />
        <Typography>{updatedAt.toDateString()}</Typography>
        <Title title="名前" />
        <Typography>{firstName}</Typography>
        <Title title="名前（読み仮名）" />
        <Typography>{firstNameKana}</Typography>
        <Title title="苗字" />
        <Typography>{lastName}</Typography>
        <Title title="苗字（読み仮名）" />
        <Typography>{lastNameKana}</Typography>
        <Title title="ステータス" />
        <Typography>{status}</Typography>
        <Title title="Chatwork アカウントID" />
        <Typography>{chatworkAccountId}</Typography>
        <Title title="残り質問タスク数" />
        <Typography>{assignedQuestionsNumber}</Typography>
        {!!teacher?.user && (
          <>
            <Title title="ユーザー" />
            <Button onClick={() => navigate(`/users/${teacher.user.id}`)}>
              ユーザー詳細ページへ
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};
