import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { StudentDetail } from "../../features/students/StudentDetail";
import { HeadEditBox } from "../../features/HeadEditBox";
import { EditButton } from "../../components/Element/Button/EditButton";
import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { useStudent } from "../../features/students/api/getStudent";
import { BackButton } from "../../components/Element/Button/BackButton";

export const StudentDetailProps = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const { data: student, isError, isPending } = useStudent({ studentId });

  if (isPending) {
    return <LoadingBox message="生徒情報を取得中" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="ネットワークエラー"
        description="生徒情報の取得に失敗しました。"
      />
    );
  }

  return (
    <>
      <HeadEditBox>
        <BackButton />
        <EditButton />
      </HeadEditBox>
      <StudentDetail student={student} />
      {!!student?.user && (
        <>
          <HeadlineTypography>ユーザー</HeadlineTypography>
          <Button onClick={() => navigate(`/users/${student.user.id}`)}>
            ユーザー詳細ページへ
          </Button>
        </>
      )}
    </>
  );
};
