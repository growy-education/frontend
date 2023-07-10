import { Box, Typography } from "@mui/material";
import { RedBoldTypography } from "./components/Typography";

export const Onayami = () => {
  return (
    <>
      <Box
        pt={10}
        pb={10}
        style={{
          backgroundImage: "url(./img/bg-onayami-1-sp-min.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          padding: "0 auto 70px",
        }}
      >
        <Typography
          style={{
            color: "#FAFFFB",
            fontWeight: "bold",
            padding: "0 auto 10px",
            fontSize: "1.1rem",
          }}
        >
          日々のお子様の受験サポートを通じて
          <br />
          こんなお悩みを感じたことはありませんか？
        </Typography>

        <Box mt={3}>
          <Typography
            style={{
              color: "#FAFFFB",
              fontWeight: "550",
              padding: "0 auto 10px",
              display: "inline-block",
              textAlign: "left",
              lineHeight: 2,
            }}
          >
            ・子どもが親に教わるのを嫌がる
            <br />
            ・スケジュール管理が苦手で予定通り進まない
            <br />
            ・勉強を見る時間を十分に取れない
            <br />
            ・子どもがわからないとすぐに諦めてしまう
            <br />
            ・子どもがどこまで解っているのかわからない
            <br />
            ・今の塾には相談しづらい
            <br />
            ・学習管理以外の部分にもっと時間を使いたい
            <br />
            ・子どもが中学受験に本気にならない
          </Typography>
        </Box>
      </Box>

      <Box style={{ backgroundColor: "#F4F4F4" }}>
        <Box style={{ textAlign: "center" }}>
          <Typography
            style={{
              fontWeight: "bold",
              lineHeight: "2rem",
              display: "inline-block",
              margin: "80px auto 70px",
            }}
          >
            <RedBoldTypography>
              でも、必要なサポートはたくさんあります
            </RedBoldTypography>
            <br />
            スケジュールの作成と管理
            <br />
            お子様に合った学習内容の準備
            <br />
            丸つけや間違えた問題の確認
            <br />
            学習の進行管理
            <br />
            志望校の調査
            <br />
            メンタルケア
            <br />
            など...
          </Typography>
        </Box>
      </Box>

      <Box
        style={{
          backgroundImage: "url(./img/bg-onayami-3-min.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          fontWeight: "bold",
          color: "#FEFEFE",
        }}
      >
        <Box
          pt={3}
          pb={3}
          style={{
            display: "inline-block",
          }}
        >
          <Typography style={{ fontWeight: "bold", lineHeight: 1.7 }}>
            これらのサポートは
            <br />
            従来の塾や個別指導などの
            <br />
            <Typography
              component="span"
              style={{
                fontWeight: "bold",
                borderBottom: "solid 2px #FEFEFE",
              }}
            >
              中学受験業界には存在せず
            </Typography>
            <br />
            これまで
            <Typography
              component="span"
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              保護者様だけで
            </Typography>
            <br />
            行わなければいけませんでした。
          </Typography>
        </Box>
      </Box>

      <Box>
        <Box style={{ display: "inline-block", margin: "80px auto" }}>
          <Typography style={{ fontWeight: "bold" }}>
            私たち「ホンネ中学受験」の元にも
            <br />
            日々届く沢山の相談。
            <br />
            <br />
            数えきれないほど膨大な量の
            <br />
            <Typography component="span" fontWeight="bold" fontSize="1.2rem">
              「名前のない中学受験サポート」
            </Typography>
            に<br />
            保護者様が苦労している状況を
            <br />
            私たちは知っています。
            <br />
            <br />
            <Typography style={{ color: "red", fontWeight: "bold" }}>
              「困っているご家庭を助けたい。」
            </Typography>
            <br />
            そんな強い想いのもと
            <br />
            私達はあなたの悩みを解決し
            <br />
            お子様を
            <Typography
              component="span"
              fontWeight="bold"
              fontSize="1.2rem"
              pl={1}
              pr={1}
              sx={{ textDecoration: "underline" }}
            >
              最高の中学受験
            </Typography>
            へ導きます。
            <br />
            <br />
            プロと一緒に効率的かつ確実に
            <br />
            やり抜く成功体験をしてみませんか？
          </Typography>
        </Box>
      </Box>
    </>
  );
};
