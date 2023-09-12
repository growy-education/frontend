import React, { useContext, useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Student } from "../../dto/student.class";
import { plainToInstance } from "class-transformer";
import { StudentDetail } from "../../components/students/StudentDetail";
import { HeadEditBox } from "../../components/HeadEditBox";
import { EditButton } from "../../components/components/EditButton";
import { BackToListButton } from "../../components/components/BackToListButton";
import { LoadingBox } from "../../components/LoadingData";

export const StudentDetailProps = () => {
  const [student, setStudent] = useState<null | Student>(null);
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const { studentId } = useParams();
  useEffect(() => {
    console.log("param studentId:", studentId);
    axios
      .create(axiosConfig)
      .get(`/students/${studentId}`)
      .then((response) => {
        const student = plainToInstance(Student, response.data);
        setStudent(student);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, studentId]);

  if (!!!student) {
    return <LoadingBox message="生徒情報を取得中" />;
  }

  return (
    <>
      <HeadEditBox>
        <BackToListButton
          onClick={() => {
            navigate(`/students`);
          }}
        />
        <EditButton
          onClick={() => {
            navigate(`/students/${student.id}/edit`);
          }}
        />
      </HeadEditBox>
      <StudentDetail student={student} />
      {!!student?.user && (
        <>
          <HeadlineTypography>ユーザー</HeadlineTypography>
          <Button onClick={() => navigate(`/users/${student.user.id}`)}>
            ユーザー詳細ページへ
          </Button>
        </>
      )}
    </>
  );
};
