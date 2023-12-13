import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { UserDetail } from "../../features/users/UserDetail";
import { LinkedUserInformation } from "../../features/users/LinkedUserInformation";
import { HeadEditBox } from "../../features/HeadEditBox";
import { LoadingBox } from "../../features/LoadingData";
import { useUser } from "../../features/users/api/getUser";
import { AlertBox } from "../../features/AlertBox";
import { NotFound } from "../../features/NotFound";
import { EditButton } from "../../components/Element/Button/EditButton";
import { BackButton } from "../../components/Element/Button/BackButton";
import { DebugUserAccordion } from "../../features/users/DebugUserAccordion";

export const UserDetailPage = () => {
  const { userId } = useParams();
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useUser({
    userId,
    options: {
      retry: false,
    },
  });

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
      <HeadEditBox>
        <BackButton />
        <EditButton />
      </HeadEditBox>

      <DebugUserAccordion userId={userId} />

      <Box my={3}>
        <Box mb={2}>
          <UserDetail user={user} />
        </Box>
        <Box>
          <LinkedUserInformation user={user} />
        </Box>
      </Box>
    </>
  );
};
