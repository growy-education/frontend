import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QuestionTitle } from "./QuestionTitle";
import { Customer } from "../types/customer.class";

export const StudentDetail = () => {
  const [customer, setCustomer] = useState<null | Customer>(null);
  const { axiosConfig } = useContext(AxiosContext);

  const { customerId } = useParams();
  console.log(customer);
  useEffect(() => {
    console.log("param customerId:", customerId);
    axios
      .create(axiosConfig)
      .get(`/customers/${customerId}`)
      .then((response) => {
        setCustomer(response.data);
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
      <Box my={3}>
        <QuestionTitle title="ID" />
        <Typography>{id}</Typography>
        <QuestionTitle title="作成日時" />
        <Typography>{createdAt.toDateString()}</Typography>
        <QuestionTitle title="更新日時" />
        <Typography>{updatedAt.toDateString()}</Typography>
        <QuestionTitle title="名前" />
        <Typography>{firstName}</Typography>
        <QuestionTitle title="名前（読み仮名）" />
        <Typography>{firstNameKana}</Typography>
        <QuestionTitle title="苗字" />
        <Typography>{lastName}</Typography>
        <QuestionTitle title="苗字（読み仮名）" />
        <Typography>{lastNameKana}</Typography>
        <QuestionTitle title="続柄" />
        <Typography>{relationship}</Typography>
      </Box>
    </Container>
  );
};
