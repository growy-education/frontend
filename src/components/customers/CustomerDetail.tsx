import { Customer } from "../../types/customer.class";
import { Typography } from "@mui/material";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../components/Typography/JaDateTimeTypography";

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
      <HeadlineTypography>保護者ID</HeadlineTypography>
      <Typography>{id}</Typography>
      <HeadlineTypography>作成日時</HeadlineTypography>
      <JaDateTimeTypography date={createdAt} />
      <HeadlineTypography>更新日時</HeadlineTypography>
      <JaDateTimeTypography date={updatedAt} />
      <HeadlineTypography>名前</HeadlineTypography>
      <Typography>{firstName}</Typography>
      <HeadlineTypography>名前（読み仮名）</HeadlineTypography>
      <Typography>{firstNameKana}</Typography>
      <HeadlineTypography>苗字</HeadlineTypography>
      <Typography>{lastName}</Typography>
      <HeadlineTypography>苗字（読み仮名）</HeadlineTypography>
      <Typography>{lastNameKana}</Typography>
      <HeadlineTypography>続柄</HeadlineTypography>
      <Typography>{relationship}</Typography>
    </>
  );
};
