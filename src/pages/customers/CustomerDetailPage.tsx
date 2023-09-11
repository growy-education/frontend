import { useContext, useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Customer } from "../../dto/customer.class";
import { CustomerDetail } from "../../components/customers/CustomerDetail";
import { CustomerContext } from "../../contexts/CustomerContextProvider";
import { LoadingBox } from "../../components/LoadingData";
import { BackToListButton } from "../../components/components/BackToListButton";
import { HeadEditBox } from "../../components/HeadEditBox";
import { EditButton } from "../../components/components/EditButton";

export const CustomerDetailPage = () => {
  const { customers, getCustomerById } = useContext(CustomerContext);
  const { customerId } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState<null | Customer>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    getCustomerById(customerId).then((found) => {
      if (found) {
        setNotFound(false);
        setCustomer(found);
      } else {
        setNotFound(true);
      }
    });
  }, [customers, customerId]);

  if (!!!customer) {
    return <LoadingBox message="保護者情報を取得中..." />;
  }

  if (notFound) {
    return <Typography>保護者が見つかりませんでした</Typography>;
  }

  return (
    <>
      <HeadEditBox>
        <BackToListButton onClick={() => navigate("/customers")} />
        <EditButton onClick={() => navigate("edit")} />
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
