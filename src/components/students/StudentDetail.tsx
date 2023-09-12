import { Typography } from "@mui/material";
import { Student } from "../../dto/student.class";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../components/Typography/JaDateTimeTypography";

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
          <HeadlineTypography>生徒ID</HeadlineTypography>
          <Typography>{id}</Typography>
        </>
      )}

      {!!createdAt && (
        <>
          <HeadlineTypography>作成日時</HeadlineTypography>
          <JaDateTimeTypography date={createdAt} />
        </>
      )}

      {!!updatedAt && (
        <>
          <HeadlineTypography>更新日時</HeadlineTypography>
          <JaDateTimeTypography date={updatedAt} />
        </>
      )}

      {!!firstName && (
        <>
          <HeadlineTypography>名前</HeadlineTypography>
          <Typography>{firstName}</Typography>
        </>
      )}

      {!!firstNameKana && (
        <>
          <HeadlineTypography>名前（読み仮名）</HeadlineTypography>
          <Typography>{firstNameKana}</Typography>
        </>
      )}

      {!!lastName && (
        <>
          <HeadlineTypography>苗字</HeadlineTypography>
          <Typography>{lastName}</Typography>
        </>
      )}

      {!!lastNameKana && (
        <>
          <HeadlineTypography>苗字（読み仮名）</HeadlineTypography>
          <Typography>{lastNameKana}</Typography>
        </>
      )}

      {!!gender && (
        <>
          <HeadlineTypography>性別</HeadlineTypography>
          <Typography>{gender}</Typography>
        </>
      )}

      {!!grade && (
        <>
          <HeadlineTypography>学年</HeadlineTypography>
          <Typography>{grade}年生</Typography>
        </>
      )}

      {!!birthday && (
        <>
          <HeadlineTypography>誕生日</HeadlineTypography>
          <JaDateTimeTypography date={birthday} />
        </>
      )}

      {!!school && (
        <>
          <HeadlineTypography>小学校</HeadlineTypography>
          <Typography>{school}</Typography>
        </>
      )}

      {!!juku && (
        <>
          <HeadlineTypography>塾</HeadlineTypography>
          <Typography>{juku}</Typography>
        </>
      )}

      {!!jukuBuilding && (
        <>
          <HeadlineTypography>塾の校舎</HeadlineTypography>
          <Typography>{jukuBuilding}</Typography>
        </>
      )}
    </>
  );
};
