import { Typography } from "@mui/material";
import { Teacher } from "../../types/teacher.class";
import { Title } from "../QuestionTitle";

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
    </>
  );
};
