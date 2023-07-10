import { Box, Typography } from "@mui/material";
import { DescriptionBox } from "./DescriptionBox";
import { TitleBox } from "./TitleBox";
import { TitleTypography } from "./TitleTypography";
import { SubtitleBox } from "./SubtitleBox";
import { SubtitleDescriptionTypography } from "./SubtitleDescriptionTypography";
import { SubtitleTypography } from "./SubtitleTypography";

export const TargetStudents = () => {
  return (
    <>
      <TitleBox>
        <TitleTypography>対象の生徒</TitleTypography>
      </TitleBox>
      <DescriptionBox mb={2}>
        <SubtitleBox>
          <SubtitleTypography>学 年</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography>
          ４～６年生
        </SubtitleDescriptionTypography>

        <SubtitleBox>
          <SubtitleTypography>教 科</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography mb={5}>
          国語・算数・理科・社会
        </SubtitleDescriptionTypography>
        <Typography>※塾の制限は設けておりません。</Typography>
      </DescriptionBox>
    </>
  );
};
