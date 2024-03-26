import { Customer } from "./types/customer.class";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../../components/Element/Typography/JaDateTimeTypography";
import { DetailTypography } from "../../components/Element/Typography/DetailTyporagphy";
import { CheckCustomerWebhookButton } from "./CheckCustomerWebhookButton";
import { Box } from "@mui/material";

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
      <DetailTypography>{id}</DetailTypography>
      <HeadlineTypography>作成日時</HeadlineTypography>
      <JaDateTimeTypography textAlign="right" date={createdAt} />
      <HeadlineTypography>更新日時</HeadlineTypography>
      <JaDateTimeTypography textAlign="right" date={updatedAt} />
      <HeadlineTypography>苗字</HeadlineTypography>
      <DetailTypography>{lastName}</DetailTypography>
      <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
      <DetailTypography>{lastNameKana}</DetailTypography>
      <HeadlineTypography>名前</HeadlineTypography>
      <DetailTypography>{firstName}</DetailTypography>
      <HeadlineTypography>名前（フリガナ）</HeadlineTypography>
      <DetailTypography>{firstNameKana}</DetailTypography>
      <HeadlineTypography>続柄</HeadlineTypography>
      <DetailTypography>{relationship}</DetailTypography>
    </>
  );
};
