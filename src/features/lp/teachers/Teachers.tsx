import { Box, Typography } from "@mui/material";
import { DescriptionBox } from "../components/DescriptionBox";
import { TeacherBox } from "./TeacherBox";
import { TeacherInfoBox } from "./TeacherInfoBox";
import { FaceImageBox } from "../components/FaceImageBox";
import { TeacherDescriptionBox } from "./TeacherDescriptionBox";
import { TeacherCommentTypography } from "./TeacherCommentTypography";

export const Teachers = () => {
  return (
    <>
      <Box mb={2}>
        <img
          src="/img/ttl-teachers-sp-min.png"
          alt="講師紹介"
          style={{ width: "100%" }}
        />
      </Box>

      <DescriptionBox p={4}>
        <Box>
          <TeacherBox>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-hirokuma.jpg"
                  alt="ヒロクマ写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  竹熊（ヒロクマ）
                </Typography>
                <Typography>算数、理科</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              小学生の頃、僕自身にとって塾は児童館に近い存在でした。
              もちろん成績も良くはなく、特に国語の成績が酷かった記憶があります。
              <br />
              しかし小学5年生の頃から父親が休日に勉強を見てくれたため、少しずつ成績が上向いていきました。特に、テストの解き直しを毎週一緒に進めたことが、それ以降の勉強習慣の基礎となりました。
              <br />
              そして、子供にとって自分の頑張りを誰かが見てくれるというのは嬉しいものです。
              <br />
              Growyの指導では、生徒の皆さんがこのような小さな成功体験を積み重ねることで、「やり抜く力」を育めるように全力を尽くしていきます。
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-yoshimon.jpg"
                  alt="よしもん写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  吉本（よしもん）
                </Typography>
                <Typography>算数、理科</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              私の周りには中学受験をする友達がほとんどいませんでした。そんな中、抵抗なく勉強することができていたのは、おそらく出会った講師がよかったからです。
              私自身も生徒に「分かることの楽しさ」「勉強の楽しさ」を感じてもらえるように、サポートしていきます。
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-hamataku.jpg"
                  alt="ハマタク写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  濱野（ハマタク）
                </Typography>
                <Typography>国語、社会</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              中学受験の勉強には様々な困難があります。そんな中で、少しでも僕との時間を楽しいと感じてもらえるように寄り添っていきます。中学受験をより実りのあるのものにしていきましょう。
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-keigo.jpg"
                  alt="ケイゴ写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  倉石（ケイゴ）
                </Typography>
                <Typography>算数、理科</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              僕の今までの指導経験から、勉強は楽しくやった方が成績が伸びます。そして、成績が伸びるとますます楽しくなります。
              <br />
              この好循環に入るためには、「頑張ったら点数が上がった」という経験が必要です。
              <br />
              この経験を積み重ね「やり抜く力」を身につけるために、全力でサポートしていきます。
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-taira.jpg"
                  alt="たいら写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  平（たいら）
                </Typography>
                <Typography>算数</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              考える楽しさ、解ける爽快感。算数を好きになってもらうように魅力を伝えたいと思います。
              <br />
              また、算数は解法を暗記するのではなく、論理的に解いていく自力をつけることで成績が伸びていきます。
              <br />
              つねに「なぜ」を意識し、将来にも役立つ「考える力」を育てるべく楽しく指導いたします。
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-asakura.jpg"
                  alt="朝倉写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  朝倉（アサピン）
                </Typography>
                <Typography>国語</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              中学受験をするということは、他の人は通らない困難にも立ち向かうことになります。
              <br />
              そんな中でも、せっかくの受験を苦しいものではなく実り多きものに出来るよう、受験や学習を楽しむ姿勢を身に付けるお手伝いを全力でさせていただきます。
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-komori.jpg"
                  alt="小森写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  小森（けーし）
                </Typography>
                <Typography>理科</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              塾に行っているのに、勉強しているのに成績が上がらない。
              <br />
              誰しもがぶつかるこの壁は「わかる」を「できる」にすることで越えられます。
              <br />
              自身の中学受験の経験も踏まえ、生徒の皆さんが「できる」を自らの力で掴めるよう、親身になってとことんお手伝いさせていただきたいと思います。
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-hagi.jpg"
                  alt="ハギ写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  萩原（ハギ）
                </Typography>
                <Typography>国語</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              中学受験は厳しい戦いの連続だと思いますが、その中で勉強を楽しみながら進めていくお手伝いができればと思っています。
              <br />
              皆さんが将来受験期を振り返ったとき、中学受験が少しでも良い経験だったと感じられるよう全力でサポートします。
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-okumura.jpg"
                  alt="奥村写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  奥村（おくむら）
                </Typography>
                <Typography>国語</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              国語って楽しい！の気持ちを生徒の皆さんに届けます！
              <br />
              国語の点数を上げるのは難しいと思っている方も多いと思います。
              <br />
              しかし、国語の問題の多くは、やり方を覚えさえすればあとは内容を当てはめるだけ。
              算数に非常に似ています。
              <br />
              私と一緒に、「国語の公式」をたくさん覚えて、「読めて楽しい！」「解けて楽しい！」を増やしていきましょう！
            </TeacherCommentTypography>
          </TeacherBox>

          <TeacherBox mt={3}>
            <TeacherInfoBox>
              <FaceImageBox>
                <img
                  src="/img/img-teacher-matsushita.jpg"
                  alt="松下写真"
                  style={{ borderRadius: "10px" }}
                />
              </FaceImageBox>
              <TeacherDescriptionBox>
                <Typography sx={{ fontWeight: "bold" }}>
                  松下（マツシタ）
                </Typography>
                <Typography>国語</Typography>
              </TeacherDescriptionBox>
            </TeacherInfoBox>
            <TeacherCommentTypography>
              中学受験の国語では、難解な文章の読解や、一筋縄ではいかない設問への解答が求められます。
              <br />
              そういった難問に取り組んでいる生徒の皆さんに、
              <br />
              「難しかったところが理解できるようになった」
              「頑張りをわかってもらえた」
              <br />
              など、嬉しさや楽しさを少しでも感じていただけるよう尽力いたします。
            </TeacherCommentTypography>
          </TeacherBox>
        </Box>

        <DescriptionBox>
          <Typography>
            ※他にも厳正な研修を終えた講師が、生徒の皆様をお待ちしております。
          </Typography>
        </DescriptionBox>
      </DescriptionBox>
    </>
  );
};
