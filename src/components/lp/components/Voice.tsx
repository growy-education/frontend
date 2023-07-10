import { Box, Typography } from "@mui/material";
import { DescriptionBox } from "./DescriptionBox";
import { VoiceBox } from "./VoiceBox";
import { ImageBox } from "./ImageBox";
import { VoiceImageBox } from "./VoiceImageBox";
import { VoiceInfoTypography } from "./VoiceInfoTypography";
import { VoiceCommentTypography } from "./VoiceCommentTypography";
import { VoiceTextBox } from "./VoiceTextBox";

export const Voice = () => {
  return (
    <>
      <img
        src="/img/bg-voice-sp-1-min.png"
        alt="保護者様の声背景"
        style={{ width: "100%" }}
      />

      <DescriptionBox>
        <VoiceBox>
          <VoiceImageBox>
            <img
              src="/img/img-mother-1-min.png"
              alt="保護者1"
              style={{ width: "100%" }}
            />
          </VoiceImageBox>

          <VoiceTextBox ml={2}>
            <VoiceInfoTypography>5年生 男子 保護者</VoiceInfoTypography>
            <VoiceCommentTypography>
              オンラインの個別指導は初めてだったので不安はありましたが、
              通塾の時間がとられない点がとても良いです。
              <br />
              他にも画面共有で国語の文章が先生と共有できるので、子供がやりやすそうでした。
              <br />
              あとはこちらの要望を色々と聞いてくださる点がありがたかったです。
            </VoiceCommentTypography>
          </VoiceTextBox>
        </VoiceBox>

        <VoiceBox mt={3}>
          <VoiceTextBox ml={2}>
            <VoiceInfoTypography>6年生 女子 保護者</VoiceInfoTypography>
            <VoiceCommentTypography>
              コーチングは今やるべきことを教えて頂けるので無駄な悩みが減り、やるべきことがわかりました。
              <br />
              ティーチングの先生もとてもわかりやすく、子どもが楽しんで学べるようになりました。
            </VoiceCommentTypography>
          </VoiceTextBox>

          <VoiceImageBox ml={2}>
            <img
              src="/img/img-mother-2-min.png"
              alt="保護者2"
              style={{ width: "100%" }}
            />
          </VoiceImageBox>
        </VoiceBox>

        <VoiceBox>
          <VoiceImageBox>
            <img
              src="/img/img-mother-3-min.png"
              alt="保護者3"
              style={{ width: "100%" }}
            />
          </VoiceImageBox>

          <VoiceTextBox ml={2}>
            <VoiceInfoTypography>4年生 女子 保護者</VoiceInfoTypography>
            <VoiceCommentTypography>
              先生方の教え方がとても優しく、丁寧でした。
              <br />
              週間スケジュールなども、変更があるとすぐに修正してくれます。
            </VoiceCommentTypography>
          </VoiceTextBox>
        </VoiceBox>
      </DescriptionBox>
      <img
        src="/img/bg-voice-sp-2-min.png"
        alt="保護者様の声背景２"
        style={{ width: "100%" }}
      />
    </>
  );
};
