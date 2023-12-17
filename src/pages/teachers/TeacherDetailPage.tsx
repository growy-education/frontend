import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { TeacherDetail } from "../../features/teachers/TeacherDetail";
import { HeaderBox } from "../../components/Layout/HeaderBox";
import { EditButton } from "../../components/Element/Button/EditButton";
import { LoadingBox } from "../../features/LoadingData";
import { useTeacher } from "../../features/teachers/api/getTeacher";
import { NotFound } from "../../features/NotFound";
import { AlertBox } from "../../features/AlertBox";
import { BackButton } from "../../components/Element/Button/BackButton";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";
import { TeacherActionMenuButton } from "../../features/teachers/components/TeacherActionMenuButton";

export const TeacherDetailProps = () => {
  const navigate = useNavigate();

  const { teacherId } = useParams();

  const {
    data: teacher,
    isLoading,
    isError,
    error,
  } = useTeacher({
    teacherId,
    options: {
      retry: false,
    },
  });

  if (isLoading) {
    return <LoadingBox message="講師情報を取得中" />;
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
      <HeaderBox>
        <BackButton />
        <TeacherActionMenuButton disabled />
      </HeaderBox>
      <TeacherDetail teacher={teacher} />
      {!!teacher?.user && (
        <>
          <HeadlineTypography>ユーザー</HeadlineTypography>
          <Button onClick={() => navigate(`/users/${teacher.user.id}`)}>
            ユーザー詳細ページへ
          </Button>
        </>
      )}
    </>
  );
};
