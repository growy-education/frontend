import { useContext, useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HeadlineTypography } from "../../components/components/Typography/HeadlineTypography";
import { Customer } from "../../dto/customer.class";
import { plainToInstance } from "class-transformer";
import { Edit } from "@mui/icons-material";
import { CustomerDetail } from "../../components/customers/CustomerDetail";

export const CustomerDetailPage = () => {
  const [customer, setCustomer] = useState<null | Customer>(null);
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const { customerId } = useParams();
  console.log(customer);
  useEffect(() => {
    console.log("param customerId:", customerId);
    axios
      .create(axiosConfig)
      .get(`/customers/${customerId}`)
      .then((response) => {
        const customer = plainToInstance(Customer, response.data);
        setCustomer(customer);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, customerId]);

  if (!customerId) {
    return <p>だめだこりゃ！</p>;
  }

  if (!!!customer) {
    return <p>ローディングなう！</p>;
  }

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent={"flex-end"} mb={2}>
        <Button
          variant="outlined"
          endIcon={<Edit />}
          onClick={() => navigate("edit")}
        >
          保護者情報を編集
        </Button>
      </Box>
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
    </Container>
  );
};
