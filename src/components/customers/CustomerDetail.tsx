import { Customer } from "../../types/customer.class";
import { Typography } from "@mui/material";
import { Title } from "../QuestionTitle";

type CustomerDetailProps = {
  customer: Customer;
};

export const CustomerDetail = ({ customer }: CustomerDetailProps) => {
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
    <>
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
    </>
  );
};
