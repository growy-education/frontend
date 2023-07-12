import { Typography } from "@mui/material";
import { Teacher } from "../../types/teacher.class";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { JaDateTime } from "../JaDateTime";
import { TeacherStatusTypography } from "./TeacherStatus";

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
          <Typography>{id}</Typography>
        </>
      )}

      {createdAt && (
        <>
          <HeadlineTypography>作成日時</HeadlineTypography>
          <JaDateTime date={createdAt} />
        </>
      )}

      {updatedAt && (
        <>
          <HeadlineTypography>更新日時</HeadlineTypography>
          <JaDateTime date={updatedAt} />
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

      {!!status && (
        <>
          <HeadlineTypography>ステータス</HeadlineTypography>
          <TeacherStatusTypography status={status} />
        </>
      )}

      {!!chatworkAccountId && (
        <>
          <HeadlineTypography>Chatwork Account ID</HeadlineTypography>
          <Typography>{chatworkAccountId}</Typography>
        </>
      )}

      {!!assignedQuestionsNumber && (
        <>
          <HeadlineTypography>残りの質問タスク数</HeadlineTypography>
          <Typography>{assignedQuestionsNumber}</Typography>
        </>
      )}
    </>
  );
};
