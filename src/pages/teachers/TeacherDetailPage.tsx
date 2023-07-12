import { useContext, useEffect, useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Teacher } from "../../types/teacher.class";
import { plainToInstance } from "class-transformer";
import { TeacherDetail } from "../../components/teachers/TeacherDetail";

export const TeacherDetailProps = () => {
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

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <TeacherDetail teacher={teacher} />
        {!!teacher?.user && (
          <>
            <HeadlineTypography>ユーザー</HeadlineTypography>
            <Button onClick={() => navigate(`/users/${teacher.user.id}`)}>
              ユーザー詳細ページへ
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};
