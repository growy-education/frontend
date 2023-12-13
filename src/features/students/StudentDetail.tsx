import { Student } from "./types/student.class";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../../components/Element/Typography/JaDateTimeTypography";
import { DetailTypography } from "../../components/Element/Typography/DetailTyporagphy";

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
          <DetailTypography>{id}</DetailTypography>
        </>
      )}

      {!!createdAt && (
        <>
          <HeadlineTypography>作成日時</HeadlineTypography>
          <JaDateTimeTypography textAlign="right" date={createdAt} />
        </>
      )}

      {!!updatedAt && (
        <>
          <HeadlineTypography>更新日時</HeadlineTypography>
          <JaDateTimeTypography textAlign="right" date={updatedAt} />
        </>
      )}

      {!!lastName && (
        <>
          <HeadlineTypography>苗字</HeadlineTypography>
          <DetailTypography>{lastName}</DetailTypography>
        </>
      )}

      {!!lastNameKana && (
        <>
          <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
          <DetailTypography>{lastNameKana}</DetailTypography>
        </>
      )}

      {!!firstName && (
        <>
          <HeadlineTypography>名前</HeadlineTypography>
          <DetailTypography>{firstName}</DetailTypography>
        </>
      )}

      {!!firstNameKana && (
        <>
          <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
          <DetailTypography>{firstNameKana}</DetailTypography>
        </>
      )}

      {!!gender && (
        <>
          <HeadlineTypography>性別</HeadlineTypography>
          <DetailTypography>{gender}</DetailTypography>
        </>
      )}

      {!!grade && (
        <>
          <HeadlineTypography>学年</HeadlineTypography>
          <DetailTypography>{grade}年生</DetailTypography>
        </>
      )}

      {!!birthday && (
        <>
          <HeadlineTypography>誕生日</HeadlineTypography>
          <JaDateTimeTypography textAlign="right" date={birthday} />
        </>
      )}

      {!!school && (
        <>
          <HeadlineTypography>小学校</HeadlineTypography>
          <DetailTypography>{school}</DetailTypography>
        </>
      )}

      {!!juku && (
        <>
          <HeadlineTypography>塾</HeadlineTypography>
          <DetailTypography>{juku}</DetailTypography>
        </>
      )}

      {!!jukuBuilding && (
        <>
          <HeadlineTypography>塾の校舎</HeadlineTypography>
          <DetailTypography>{jukuBuilding}</DetailTypography>
        </>
      )}
    </>
  );
};
