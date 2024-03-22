import { Box, Typography } from "@mui/material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { CreateCustomerDto } from "./types/create-customer.dto";
import { CustomerServiceChips } from "./services/CustomerServiceChips";

export const CustomerNewConfirmation = ({
  dto,
}: {
  dto: CreateCustomerDto;
}) => {
  const {
    firstName,
    firstNameKana,
    lastName,
    lastNameKana,
    relationship,
    services,
    spaceWebhookUrl,
  } = dto;

  return (
    <>
      <HeadlineTypography>保護者情報</HeadlineTypography>
      <Box m={2}>
        <HeadlineTypography>氏名</HeadlineTypography>
        <Typography>{lastName + " " + firstName}</Typography>

        <HeadlineTypography>氏名（フリガナ）</HeadlineTypography>
        <Typography>{lastNameKana + " " + firstNameKana}</Typography>

        <HeadlineTypography>続柄</HeadlineTypography>
        <Typography>{relationship}</Typography>

        <HeadlineTypography>サービス</HeadlineTypography>
        <CustomerServiceChips services={services} />

        <HeadlineTypography>GoogleChat Webhook(スペース)</HeadlineTypography>
        <Typography>{spaceWebhookUrl}</Typography>
      </Box>
    </>
  );
};
