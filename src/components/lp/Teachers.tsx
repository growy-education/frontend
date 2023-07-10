import { Box, Typography } from "@mui/material";
import { DescriptionBox } from "./components/DescriptionBox";
import { TeacherBox } from "./components/TeacherBox";
import { TeacherInfoBox } from "./components/TeacherInfoBox";
import { FaceImageBox } from "./components/FaceImageBox";
import { TeacherDescriptionBox } from "./components/TeacherDescriptionBox";
import { TeacherCommentTypography } from "./components/TeacherCommentTypography";

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
                <Typography style={{ fontWeight: "bold" }}>ヒロクマ</Typography>
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
                <Typography style={{ fontWeight: "bold" }}>よしもん</Typography>
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
                <Typography style={{ fontWeight: "bold" }}>ハマタク</Typography>
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
                <Typography style={{ fontWeight: "bold" }}>ケイゴ</Typography>
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
        </Box>

        {/* アコーディオンメニュー
            <details className="accordion-btn-2">
              <summary>
                <div className="accordion-ttl-2">
                  　その他の講師を見る　　　　▼
                </div>
              </summary>
            </details> */}

        <DescriptionBox>
          <Typography>
            ※他にも厳正な研修を終えた講師が、生徒の皆様をお待ちしております。
          </Typography>
        </DescriptionBox>
      </DescriptionBox>
    </>
  );
};
