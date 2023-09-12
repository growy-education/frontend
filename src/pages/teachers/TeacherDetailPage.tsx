import { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Teacher } from "../../dto/teacher.class";
import { plainToInstance } from "class-transformer";
import { TeacherDetail } from "../../components/teachers/TeacherDetail";
import { HeadEditBox } from "../../components/HeadEditBox";
import { BackToListButton } from "../../components/components/BackToListButton";
import { EditButton } from "../../components/components/EditButton";
import { LoadingBox } from "../../components/LoadingData";

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
    return <LoadingBox message="講師情報を取得中" />;
  }

  return (
    <>
      <HeadEditBox>
        <BackToListButton
          onClick={() => {
            navigate(`/teachers`);
          }}
        />
        <EditButton
          onClick={() => {
            navigate(`/teachers/${teacher.id}/edit`);
          }}
        />
      </HeadEditBox>
      <TeacherDetail teacher={teacher} />
      {!!teacher?.user && (
        <>
          <HeadlineTypography>ユーザー</HeadlineTypography>
          <Button onClick={() => navigate(`/users/${teacher.user.id}`)}>
            ユーザー詳細ページへ
          </Button>
        </>
      )}
    </>
  );
};
