import { Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { CustomerDetail } from "../../features/customers/CustomerDetail";
import { LoadingBox } from "../../features/LoadingData";
import { HeadEditBox } from "../../features/HeadEditBox";
import { EditButton } from "../../components/Element/Button/EditButton";
import { AlertBox } from "../../features/AlertBox";
import { useCustomer } from "../../features/customers/api/getCustomer";
import { BackButton } from "../../components/Element/Button/BackButton";

export const CustomerDetailPage = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const { data: customer, isError, isPending } = useCustomer({ customerId });

  if (isPending) {
    return <LoadingBox message="保護者情報を取得中" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="ネットワークエラー"
        description="保護者情報の取得に失敗しました。"
      />
    );
  }

  return (
    <>
      <HeadEditBox>
        <BackButton />
        <EditButton />
      </HeadEditBox>
      <Box my={3}>
        <CustomerDetail customer={customer} />
        {!!customer?.user && (
          <>
            <HeadlineTypography>ユーザー</HeadlineTypography>
            <Button onClick={() => navigate(`/users/${customer.user.id}`)}>
              ユーザー詳細ページへ
            </Button>
          </>
        )}
      </Box>
    </>
  );
};
