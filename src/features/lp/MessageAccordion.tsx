import { Container, Typography } from "@mui/material";
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from "./CustomAccordions";

export const MessageAccordion = () => {
  return (
    <Container sx={{ background: "transparent", marginTop: "2rem" }}>
      <CustomAccordion>
        <CustomAccordionSummary>
          <Typography variant="h4">Growy創業にあたって</Typography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <Typography component="p" sx={{ textAlign: "left" }}>
            私たちGrowyのスタッフは、もともと中学受験に奮闘する親御様に向けたメディア発信活動「ホンネで中学受験」を運営してきました。
            <br />
            「ホンネで中学受験」では、
            <Typography
              variant="body1"
              component="a"
              href="https://twitter.com/honnedechuju"
            >
              Twitter
            </Typography>
            や
            <Typography
              variant="body1"
              component="a"
              href="https://honnedechuju.com/"
            >
              ブログ
            </Typography>
            、
            <Typography
              variant="body1"
              component="a"
              href="https://www.youtube.com/channel/UC35PZPRvt3OBQ10dYj2k61w"
            >
              YouTube
            </Typography>
            を通じて「子どもの成績が伸びない」という保護者の方々の悩みに応えてきました。
            <br />
            この活動の中で、ありがたいことにたくさんの感謝の言葉を頂くことができました。
            <br />
            <br />
            これは私たちにとって本当に誇らしいことです。
            <br />
            <br />
            しかしその一方で、「ホンネで中学受験」だけでは十分にサポートできないご家庭の声もまた、私たちに届くようになりました。
            <br />
            <br />
            <b>
              「どうすれば良いかはわかったけれど、子どもに割く時間がどうしても足りないんです。」
            </b>
            <br />
            <br />
            <b>
              「忙しいとは思いますが、うちの子どもの指導をお願いできませんか？」
            </b>
            <br />
            <br />
            これらの声が届くたびに、中学受験の情報が届いていても、悩みを解決できずに困っているご家庭がたくさんあることを痛感させられました。
            <br />
            <br />
            <b>
              「私たちで、どうにかしてこのようなご家庭を助けることはできないだろうか？」
            </b>
            <br />
            <br />
            そのような想いで私たちは、<b>新時代の個別指導塾「Growy」</b>
            を始めました。
          </Typography>
        </CustomAccordionDetails>
      </CustomAccordion>
    </Container>
  );
};
