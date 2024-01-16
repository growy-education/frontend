import { Typography } from "@mui/material";
import { DescriptionBox } from "../components/DescriptionBox";
import { TitleBox } from "../components/TitleBox";
import { TitleTypography } from "../components/TitleTypography";
import { SubtitleBox } from "../components/SubtitleBox";
import { SubtitleDescriptionTypography } from "../components/SubtitleDescriptionTypography";
import { SubtitleTypography } from "../components/SubtitleTypography";
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
          <br />
          以下の料金は全て税込になります。
        </Typography>

        <SubtitleBox>
          <SubtitleTypography>入会料金</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography>11,000円</SubtitleDescriptionTypography>

        <SubtitleBox>
          <SubtitleTypography>コーチング料金</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography>
          4年生：44,000円/月
          <br />
          5年生：55,000円/月
          <br />
          6年生：66,000円/月
        </SubtitleDescriptionTypography>

        <SubtitleBox>
          <SubtitleTypography>ティーチング料金</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography>
          4・5年生：7,700円/コマ(80分)
          <br />
          6年生：8,800円/コマ(80分)
        </SubtitleDescriptionTypography>

        <SubtitleBox>
          <SubtitleTypography>過去問・模試動画添削</SubtitleTypography>
        </SubtitleBox>
        <SubtitleDescriptionTypography>
          5,000円/教材
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

          <AttentionDescriptionBox>
            <AsteriskTypography />
            <AttentionDescriptionTypography>
              過去問・模試動画添削では、1年度1科目分(例:「〇〇中2023年度国語」)で１教材とさせていただきます。
            </AttentionDescriptionTypography>
          </AttentionDescriptionBox>
        </AttentionBox>
      </DescriptionBox>
    </>
  );
};
