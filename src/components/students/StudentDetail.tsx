import { Typography } from "@mui/material";
import { Student } from "../../types/student.class";
import { Title } from "../QuestionTitle";

type StudentDetailProps = {
  student: Student;
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
  } = student;
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
      <Title title="性別" />
      <Typography>{gender}</Typography>
    </>
  );
};
