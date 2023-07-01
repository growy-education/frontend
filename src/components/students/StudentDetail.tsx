import { Typography } from "@mui/material";
import { Student } from "../../types/student.class";
import { Title } from "../QuestionTitle";
import { JaDateTime } from "../JaDateTime";

type StudentDetailProps = {
  student: Partial<Student>;
};

export const StudentDetail = ({ student }: StudentDetailProps) => {
  const {
    id,
    createdAt,
    updatedAt,
    firstName,
    firstNameKana,
    lastName,
    lastNameKana,
    gender,
    school,
    juku,
    jukuBuilding,
    grade,
    birthday,
  } = student;
  return (
    <>
      {!!id && (
        <>
          <Title title="ID" />
          <Typography>{id}</Typography>
        </>
      )}

      {!!createdAt && (
        <>
          <Title title="作成日時" />
          <JaDateTime date={createdAt} />
        </>
      )}

      {!!updatedAt && (
        <>
          <Title title="更新日時" />
          <JaDateTime date={updatedAt} />
        </>
      )}

      {!!firstName && (
        <>
          <Title title="名前" />
          <Typography>{firstName}</Typography>
        </>
      )}

      {!!firstNameKana && (
        <>
          <Title title="名前（読み仮名）" />
          <Typography>{firstNameKana}</Typography>
        </>
      )}

      {!!lastName && (
        <>
          <Title title="苗字" />
          <Typography>{lastName}</Typography>
        </>
      )}

      {!!lastNameKana && (
        <>
          <Title title="苗字（読み仮名）" />
          <Typography>{lastNameKana}</Typography>
        </>
      )}

      {!!gender && (
        <>
          <Title title="性別" />
          <Typography>{gender}</Typography>
        </>
      )}

      {!!grade && (
        <>
          <Title title="学年" />
          <Typography>{grade}年生</Typography>
        </>
      )}

      {!!birthday && (
        <>
          <Title title="" />
          <Typography></Typography>
        </>
      )}

      {!!school && (
        <>
          <Title title="小学校" />
          <Typography>{school}</Typography>
        </>
      )}

      {!!juku && (
        <>
          <Title title="塾" />
          <Typography>{juku}</Typography>
        </>
      )}

      {!!jukuBuilding && (
        <>
          <Title title="塾の校舎" />
          <Typography>{jukuBuilding}</Typography>
        </>
      )}
    </>
  );
};
