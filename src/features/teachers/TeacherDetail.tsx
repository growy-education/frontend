import { Teacher } from "./types/teacher.class";
import { NotFound } from "../NotFound";
import { Id } from "../../components/shared/Id";
import { CreatedAt } from "../../components/shared/CreatedAt";
import { UpdatedAt } from "../../components/shared/UpdatedAt";
import { TeacherLastName } from "./components/TeacherLastName";
import { Divider } from "@mui/material";
import { TeacherLastNameKana } from "./components/TeacherLastNameKana";
import { TeacherFirstName } from "./components/TeacherFirstName";
import { TeacherFirstNameKana } from "./components/TeacherFirstNameKana";
import { ChatworkAccountId } from "./components/ChatworkAccountId";
import { TeacherStatus } from "./components/TeacherStatus";
import { TeacherSubjects } from "./components/TeacherSubjects";

type TeacherDetailProps = {
  teacher: Teacher;
};

export const TeacherDetail = ({ teacher }: TeacherDetailProps) => {
  if (!!!teacher) {
    return <NotFound />;
  }
  const { id, createdAt, updatedAt } = teacher;

  return (
    <>
      <Id id={id} my={1} />
      <Divider />
      <CreatedAt createdAt={createdAt} my={1} />
      <Divider />
      <UpdatedAt updatedAt={updatedAt} my={1} />
      <Divider />
      <TeacherLastName teacher={teacher} my={1} />
      <Divider />
      <TeacherLastNameKana teacher={teacher} my={1} />
      <Divider />
      <TeacherFirstName teacher={teacher} my={1} />
      <Divider />
      <TeacherFirstNameKana teacher={teacher} my={1} />
      <Divider />
      <TeacherStatus teacher={teacher} my={1} />
      <Divider />
      <TeacherSubjects teacher={teacher} my={1} />
      <Divider />
      <ChatworkAccountId teacher={teacher} my={1} />
    </>
  );
};
