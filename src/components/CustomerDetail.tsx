import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Title } from "./QuestionTitle";
import { Customer } from "../types/customer.class";
import { plainToInstance } from "class-transformer";
import { Edit } from "@mui/icons-material";

export const CustomerDetail = () => {
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

  const {
    id,
    createdAt,
    updatedAt,
    firstName,
    firstNameKana,
    lastName,
    lastNameKana,
    relationship,
  } = customer;

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
        <Title title="続柄" />
        <Typography>{relationship}</Typography>
      </Box>
    </Container>
  );
};
