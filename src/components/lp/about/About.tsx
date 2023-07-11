import { Box, Typography, TypographyProps } from "@mui/material";
import { Coaching } from "../coaching/Coaching";
import { Teaching } from "../teaching/Teaching";
import { BoldTypography } from "../components/Typography";

const CoachingTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      component="span"
      sx={{ color: "#05712E", fontWeight: 700 }}
      {...props}
    >
      {children}
    </Typography>
  );
};

const TeachingTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      component="span"
      sx={{ color: "#3D9654", fontWeight: 700 }}
      {...props}
    >
      {children}
    </Typography>
  );
};

const CoachingPointTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: "1.5rem",
        marginBottom: "3%",
        fontWeight: 600,
        lineHeight: "2.0rem",
        color: "#05712E",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

const TeachingPointTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      sx={{
        fontSize: "2.5rem",
        marginBottom: "3%",
        fontWeight: 600,
        lineHeight: "3rem",
        color: "#3D9654",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const About = () => {
  return (
    <Box>
      <Box>
        <img
          src="/img/ttl-about-1-sp-min.jpg"
          alt="個別指導塾Growyとは"
          style={{ width: "100%", verticalAlign: "middle" }}
        />
      </Box>

      <Box
        style={{
          backgroundImage: "url(./img/bg-about-1-min.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          style={{
            display: "inline-block",
            margin: "40% 2em 2em",
            backgroundColor: "rgba(252, 255, 253, 0.7)",
            lineHeight: "1.2em",
          }}
          p={3}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              lineHeight: "1.5em",
            }}
          >
            ２つのサポートで
            <br />
            お子様のやり抜く力を伸ばす
            <br />
            <Typography
              component="span"
              color="red"
              fontSize="1.2rem"
              fontWeight="bold"
            >
              新時代の個別指導塾
            </Typography>
          </Typography>

          <Box
            p={3}
            style={{
              display: "block",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                display: "inline-block",
                textAlign: "left",
                lineHeight: "1.35em",
              }}
            >
              「最高の中学受験とするために、やり抜く成功体験をお届けする」というコンセプトで、
              <CoachingTypography>コーチング</CoachingTypography>と
              <TeachingTypography>ティーチング</TeachingTypography>
              の両面からお子様を全力サポートいたします。
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box>
          <img
            src="/img/ttl-about-2-sp-min.jpg"
            alt="他の家庭教師や塾にはないGrowyの特徴"
            style={{ width: "100%" }}
          />
        </Box>

        <Box p={5}>
          <Typography sx={{ textAlign: "left", lineHeight: "1.7rem" }}>
            Growyの最大のポイントは、講師の役割が
            <CoachingTypography>コーチング</CoachingTypography>と
            <TeachingTypography>ティーチング</TeachingTypography>
            の２つに分けられていることにあります。
            <br />
            <br />
            <CoachingTypography>コーチング</CoachingTypography>では、
            <BoldTypography>
              これまで保護者様が１人でやらなければならない仕事
            </BoldTypography>
            だったサポートの役割を、
            <BoldTypography>保護者様と協力して</BoldTypography>
            おこなっていきます。
            <br />
            <br />
            そして
            <TeachingTypography>ティーチング</TeachingTypography>では、
            <CoachingTypography>コーチング</CoachingTypography>
            できめ細やかに把握した状況を具体的な学習内容に落とし込むことで、より効率的で確実な成績アップに繋げます。
          </Typography>

          <Box pt={2} pb={2}>
            <Box>
              <img
                src="/img/zukai-coaching-min.png"
                alt="コーチング"
                style={{ width: "100%" }}
              />
            </Box>
            <Box
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20%",
                marginBottom: "20%",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  width: "100%",
                  minWidth: "300px",
                  zIndex: 10,
                }}
              >
                <img
                  src="/img/arrows-min.png"
                  alt="矢印"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    animation: "rotate-anime 5s linear infinite",
                  }}
                />
              </Box>
              <Box
                style={{
                  zIndex: 1,
                  width: "40%",
                  minWidth: "150px",
                }}
              >
                <img
                  src="/img/zukai-text-min.png"
                  alt="保護者と〜"
                  style={{ width: "100%" }}
                />
              </Box>
            </Box>
            <Box style={{ width: "100%" }}>
              <img
                src="/img/zukai-teaching-min.png"
                alt="ティーチング"
                style={{ width: "100%", maxHeight: "100%" }}
              />
            </Box>
          </Box>

          <Box>
            <Box pt={2} pb={2}>
              <Typography sx={{ textAlign: "left", lineHeight: "1.7rem" }}>
                そして、この
                <CoachingTypography>コーチング</CoachingTypography>と
                <TeachingTypography>ティーチング</TeachingTypography>
                の業務を担当するのが、
                <BoldTypography>プロフェッショナルな講師陣</BoldTypography>
                です。
              </Typography>
            </Box>

            <Box pt={2} pb={2}>
              <Typography textAlign={"left"}>
                <img
                  src="/img/logo-min.png"
                  alt="ロゴ"
                  style={{
                    width: "6rem",
                    verticalAlign: "bottom",
                  }}
                />
                の講師陣は、小学4年生から6年生までの幅広い指導経験があり、中学受験全体を深く理解している
                <BoldTypography>プロフェッショナル</BoldTypography>
                です。
                <br />
                各ご家庭の中学受験の目的やお子様の性格・能力に合わせた最適なスケジュールや学習内容を、中学受験のプロが御用意します。
              </Typography>
            </Box>

            <Box>
              <img
                src="/img/img-teachers-min.png"
                alt="講師陣"
                style={{ width: "100%" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Coaching />

      <Teaching />
    </Box>
  );
};
