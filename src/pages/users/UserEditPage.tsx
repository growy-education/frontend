import { useParams } from "react-router-dom";

import { LoadingBox } from "../../features/LoadingData";
import { UserEdit } from "../../features/users/UserEdit";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";

import { AlertBox } from "../../features/AlertBox";
import { useUser } from "../../features/users/api/getUser";

export const UserEditPage = () => {
  const { userId } = useParams();
  const { data: user, isError, isPending } = useUser({ userId });

  if (isPending) {
    return <LoadingBox message="ユーザー情報を取得中です" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラーが発生しました"
        description="ユーザー情報を取得できませんでした。ネットワーク状態を確認してください。"
      />
    );
  }

  return (
    <>
      <PageTitleTypography>ユーザー情報を編集する</PageTitleTypography>
      {!!user && <UserEdit user={user} />}
    </>
  );
};
