import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { ChatworkAccountId } from "../../features/teachers/components/ChatworkAccountId";
import { useTeacher } from "../../features/teachers/api/getTeacher";
import { LoadingBox } from "../../features/LoadingData";
import { AxiosError } from "axios";
import { NotFound } from "../../features/NotFound";
import { AlertBox } from "../../features/AlertBox";
import { TeacherStatus } from "../../features/teachers/components/TeacherStatus";
import { TeacherLastName } from "../../features/teachers/components/TeacherLastName";
import { TeacherLastNameKana } from "../../features/teachers/components/TeacherLastNameKana";
import { TeacherFirstName } from "../../features/teachers/components/TeacherFirstName";
import { TeacherFirstNameKana } from "../../features/teachers/components/TeacherFirstNameKana";
import { Divider } from "@mui/material";
import { CreatedAt } from "../../components/shared/CreatedAt";
import { UpdatedAt } from "../../components/shared/UpdatedAt";
import { Id } from "../../components/shared/Id";

export const TeacherSettingsPage = () => {
  const {
    data: teacher,
    isLoading,
    isError,
    error,
  } = useTeacher({ teacherId: "me" });

  if (isLoading) {
    return <LoadingBox message="生徒情報を取得中" />;
  }

  if (isError && error instanceof AxiosError && error.response.status === 404) {
    return <NotFound />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラー"
        description="生徒情報の取得に失敗しました"
      />
    );
  }

  return (
    <>
      <PageTitleTypography>講師情報</PageTitleTypography>
      <>
        <Id id={teacher.id} my={1} />
        <Divider />
        <CreatedAt createdAt={teacher.createdAt} my={1} />
        <Divider />
        <UpdatedAt updatedAt={teacher.updatedAt} my={1} />
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
        <ChatworkAccountId teacher={teacher} my={1} />
      </>
    </>
  );
};
