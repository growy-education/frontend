import { Box, Typography } from "@mui/material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { CreateStudentDto } from "./types/create-student.dto";

export const StudentNewConfirmation = ({ dto }: { dto: CreateStudentDto }) => {
  const {
    firstName,
    firstNameKana,
    lastName,
    lastNameKana,
    gender,
    school,
    juku,
    jukuBuilding,
    grade,
    birthday,
  } = dto;

  return (
    <>
      <HeadlineTypography>生徒情報</HeadlineTypography>
      <Box m={2}>
        <HeadlineTypography>氏名</HeadlineTypography>
        <Typography>{lastName + " " + firstName}</Typography>

        <HeadlineTypography>氏名（フリガナ）</HeadlineTypography>
        <Typography>{lastNameKana + " " + firstNameKana}</Typography>

        <HeadlineTypography>性別</HeadlineTypography>
        <Typography>{gender}</Typography>

        <HeadlineTypography>学校名</HeadlineTypography>
        <Typography>{school}</Typography>

        <HeadlineTypography>塾名</HeadlineTypography>
        <Typography>{juku}</Typography>

        <HeadlineTypography>塾の校舎</HeadlineTypography>
        <Typography>{jukuBuilding}</Typography>

        <HeadlineTypography>学年</HeadlineTypography>
        <Typography>{grade}</Typography>

        <HeadlineTypography>生年月日</HeadlineTypography>
        <Typography>{birthday.format("YYYY-MM-DD")}</Typography>
      </Box>
    </>
  );
};
