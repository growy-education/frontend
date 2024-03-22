import { Box, Typography } from "@mui/material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { CreateTeacherDto } from "./types/create-teacher.dto";

export const TeacherNewConfirmation = ({ dto }: { dto: CreateTeacherDto }) => {
  const {
    firstName,
    firstNameKana,
    lastName,
    lastNameKana,
    chatworkAccountId,
  } = dto;

  return (
    <>
      <HeadlineTypography>講師情報</HeadlineTypography>
      <Box m={2}>
        <HeadlineTypography>氏名</HeadlineTypography>
        <Typography>{lastName + " " + firstName}</Typography>

        <HeadlineTypography>氏名（フリガナ）</HeadlineTypography>
        <Typography>{lastNameKana + " " + firstNameKana}</Typography>

        <HeadlineTypography>ChatworkAccountId</HeadlineTypography>
        <Typography>{chatworkAccountId}</Typography>
      </Box>
    </>
  );
};
