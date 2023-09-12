import { Typography } from "@mui/material";
import { Teacher } from "../../dto/teacher.class";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../components/Typography/JaDateTimeTypography";
import { TeacherStatusTypography } from "./TeacherStatus";
import { DetailTypography } from "../components/DetailTyporagphy";

type TeacherDetailProps = {
  teacher: Teacher;
};

export const TeacherDetail = ({ teacher }: TeacherDetailProps) => {
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
    <>
      {id && (
        <>
          <HeadlineTypography>講師ID</HeadlineTypography>
          <DetailTypography>{id}</DetailTypography>
        </>
      )}

      {createdAt && (
        <>
          <HeadlineTypography>作成日時</HeadlineTypography>
          <JaDateTimeTypography textAlign="right" date={createdAt} />
        </>
      )}

      {updatedAt && (
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

      {!!status && (
        <>
          <HeadlineTypography>ステータス</HeadlineTypography>
          <TeacherStatusTypography textAlign="right" status={status} />
        </>
      )}

      {!!chatworkAccountId && (
        <>
          <HeadlineTypography>Chatwork Account ID</HeadlineTypography>
          <DetailTypography>{chatworkAccountId}</DetailTypography>
        </>
      )}

      {!!assignedQuestionsNumber && (
        <>
          <HeadlineTypography>残りの質問タスク数</HeadlineTypography>
          <DetailTypography>{assignedQuestionsNumber}</DetailTypography>
        </>
      )}
    </>
  );
};
