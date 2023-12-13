import { Box, Typography } from "@mui/material";
import { ImageBox } from "./ImageBox";
import { DescriptionBox } from "./DescriptionBox";
import { BoldTypography } from "./Typography";

export const YushinMessage = () => {
  return (
    <>
      <img
        src="/img/ttl-message-sp-min.jpg"
        alt="代表からあなたへのメッセージ"
        style={{ width: "100%" }}
      />

      <Box p={3}>
        <ImageBox>
          <img
            src="/img/img-teacher-yushin.jpg"
            alt="代表写真"
            style={{ width: "100%" }}
          />
        </ImageBox>
        <DescriptionBox p={3}>
          <Box
            p={2}
            sx={{
              borderTop: "1.5px solid",
              borderTopCOlor: "primary.main",
              borderBottom: "1.5px solid",
              borderBottomColor: "primary.main",
            }}
          >
            <Typography>
              <Typography>個別指導塾 Growy 代表</Typography>
              <Typography fontSize="1.2rem">ユウシン</Typography>
              <Typography>
                <Typography>「ホンネで中学受験」代表</Typography>
                <Typography>現役中学受験塾講師・家庭教師</Typography>
              </Typography>
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography textAlign={"left"}>
              &nbsp;みなさんは、中学受験を通して、お子さんのどのような未来を想像しますでしょうか。
              <br />
              <br />
              &nbsp;充実した施設や学習環境で、すばらしい友人に囲まれ、部活に勉強にと楽しい中学高校生活をイメージする方も、大学受験での成功をイメージする方も、千差万別のイメージをお持ちのことと思います。
              <br />
              <br />
              &nbsp;そしてそれは突き詰めて言うと、お子さんが「幸せ」になれることを願ってのことではないでしょうか。
              <br />
              <br />
              &nbsp;
              我々はお子さんの未来の「幸せ」を心の底から願っており、応援して、支えていきます。
              <br />
              <br />
              &nbsp;そのために、<BoldTypography>「やり抜く力」</BoldTypography>
              と<BoldTypography>「学ぶ力」</BoldTypography>
              というのが非常に重要であると考えており、Growyでの学びを通して、未来を切り拓けるようになってもらいたいと思います。
              <br />
              <br />
              &nbsp;ぜひ、一緒に最高の中学受験にしましょう！
            </Typography>
          </Box>
        </DescriptionBox>
      </Box>
    </>
  );
};
