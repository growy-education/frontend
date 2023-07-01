import { Typography } from "@mui/material";
import { Teacher } from "../../types/teacher.class";
import { Title } from "../QuestionTitle";
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
          <Title title="ID" />
          <Typography>{id}</Typography>
        </>
      )}

      {createdAt && (
        <>
          <Title title="作成日時" />
          <JaDateTime date={createdAt} />
        </>
      )}

      {updatedAt && (
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

      {!!status && (
        <>
          <Title title="ステータス" />
          <TeacherStatusTypography status={status} />
        </>
      )}

      {!!chatworkAccountId && (
        <>
          <Title title="Chatwork アカウントID" />
          <Typography>{chatworkAccountId}</Typography>
        </>
      )}

      {!!assignedQuestionsNumber && (
        <>
          <Title title="残り質問タスク数" />
          <Typography>{assignedQuestionsNumber}</Typography>
        </>
      )}
    </>
  );
};
