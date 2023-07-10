import { Typography } from "@mui/material";
import { DescriptionBox } from "./DescriptionBox";
import { TitleBox } from "./TitleBox";
import { TitleTypography } from "./TitleTypography";
import { SubtitleBox } from "./SubtitleBox";
import { SubtitleDescriptionTypography } from "./SubtitleDescriptionTypography";
import { SubtitleTypography } from "./SubtitleTypography";
import { AttentionBox } from "./AttentionBox";
import { AttentionTitleTypography } from "./AttentionTitleTypography";
import { AsteriskTypography } from "./AsteriskTypography";
import { AttentionDescriptionBox } from "./AttentionDescriptionBox";
import { AttentionDescriptionTypography } from "./AttentionDescriptionTypography";

export const Price = () => {
  return (
    <>
      <TitleBox>
        <TitleTypography>料 金</TitleTypography>
      </TitleBox>
      <DescriptionBox p={4}>
        <Typography lineHeight={"1.7rem"} textAlign={"left"}>
          Growyの費用は、以下に全て明示しております。
          <br />
          塾業界ではホームページに料金を記載しない塾が多いですが、私たちは納得のいくサービスを提供するために掲示しています。
          <br />
          ここに記載のある料金以外は一切かかりません。
        </Typography>

        <SubtitleBox>
          <SubtitleTypography>入会料金</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography>10,000円</SubtitleDescriptionTypography>

        <SubtitleBox>
          <SubtitleTypography>コーチング料金</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography>
          50,000円/月
        </SubtitleDescriptionTypography>

        <SubtitleBox>
          <SubtitleTypography>ティーチング料金</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography>
          8,000円/コマ(80分)
        </SubtitleDescriptionTypography>
      </DescriptionBox>

      <DescriptionBox>
        <AttentionBox>
          <AttentionTitleTypography>！注意事項！</AttentionTitleTypography>

          <AttentionDescriptionBox>
            <AsteriskTypography />
            <AttentionDescriptionTypography>
              入会料金は、他のお客様からの紹介でご入会する際には無料となります。
            </AttentionDescriptionTypography>
          </AttentionDescriptionBox>

          <AttentionDescriptionBox>
            <AsteriskTypography />
            <AttentionDescriptionTypography>
              コーチングのみ、またはティーチングのみも対応いたします。
            </AttentionDescriptionTypography>
          </AttentionDescriptionBox>

          <AttentionDescriptionBox>
            <AsteriskTypography />
            <AttentionDescriptionTypography>
              ティーチングは月4コマ以上を受講していただきます。
            </AttentionDescriptionTypography>
          </AttentionDescriptionBox>
        </AttentionBox>
      </DescriptionBox>
    </>
  );
};
