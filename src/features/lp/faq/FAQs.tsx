import {
  Accordion,
  AccordionDetails,
  AccordionDetailsProps,
  AccordionProps,
  AccordionSummary,
  AccordionSummaryProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const CustomAccordion = ({ children, ...props }: AccordionProps) => {
  return (
    <Accordion
      sx={{
        width: "100%",
        backgroundColor: "#f0f5f9",
        marginBottom: "1rem",
        lineHeight: "2.4rem",
        textAlign: "left",
        justifyContent: "flex-start",
      }}
      {...props}
    >
      {children}
    </Accordion>
  );
};

const CustomAccordionSummary = ({
  children,
  ...props
}: AccordionSummaryProps) => {
  return (
    <AccordionSummary
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#006837",
        color: "#F6F9F8",
        border: "#006837",
        textAlign: "left",
        justifyContent: "flex-start",
      }}
      expandIcon={<ExpandMore sx={{ color: "common.white" }} />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      {...props}
    >
      {children}
    </AccordionSummary>
  );
};

const QTypography = () => {
  return (
    <Typography
      variant="h4"
      sx={{
        color: "common.white",
        marginTop: "auto",
        marginBottom: "auto",
      }}
    >
      Q
    </Typography>
  );
};

const TitleTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      sx={{
        color: "common.white",
        marginTop: "auto",
        marginBottom: "auto",
        marginLeft: "1.5rem",
        marginRight: "auto",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

const CustomAccordionDetails = ({
  children,
  ...props
}: AccordionDetailsProps) => {
  return (
    <AccordionDetails
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: "16px",
        border: "solid #006837",
        textAlign: "left",
        justifyContent: "flex-start",
      }}
      {...props}
    >
      {children}
    </AccordionDetails>
  );
};

const DescriptionTypography = ({ children, ...props }: TypographyProps) => {
  return (
    <Typography
      sx={{
        marginTop: "auto",
        marginBottom: "auto",
      }}
      {...props}
    >
      {children}
    </Typography>
  );
};

export const FAQService = () => {
  return (
    <>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>校舎はないのですか？</TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            すべてのサービスをオンラインで提供しているため、
            現在は校舎を設けておりません。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>

      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>地方・海外在住なのですが</TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            Growyはオンラインで完結できるサービスのため、居住地に関係なくご利用になれます。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>
            子どもが勉強嫌いなのですが、勉強嫌いを克服できますか？
          </TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            大丈夫です。Growyはそんなご家庭のために作られたサービスです。
            生徒様のレベルに合わせて、最高の学習環境を用意します。
            小さな成功体験から始めていきましょう。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>他塾との併用は可能でしょうか？</TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            大丈夫です。むしろ私たちのサービスは、集団塾と併用することで最大限効果を発揮します。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>解約はどうするのでしょうか？</TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            解約手続きはチャットでその旨をお伝えいただけましたら、即刻手続きをさせていただきます。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
    </>
  );
};

export const FAQCoaching = () => {
  return (
    <>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>
            相談のチャットはいつでも大丈夫でしょうか？
          </TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            早朝や深夜でも、いつ相談していただいても大丈夫です。可能な限り早く誠実に対応いたします。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>チャットは何を使うのでしょうか？</TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            現在はGoogleChatを使用しています。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>
            学習スケジュールの共有はどう行うのですか？
          </TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            現在はGoogleSpreadsheetを使用して、共有を行なっています。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
    </>
  );
};

export const FAQTeaching = () => {
  return (
    <>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>
            共働きで夕方は家に子どもしかいないのですが、オンライン指導はできますか？
          </TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            ティーチングはオンラインですので、パソコンとネット環境があれば大丈夫です。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>
            週に何日ほどティーチングをするのですか？
          </TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            ご家庭の事情に合わせて、何日でも対応いたします。
            休日も対応可能ですので、他の習い事があっても大丈夫です。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>
            オンライン指導の講師は毎週同じですか？
          </TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            毎週の固定授業は、原則同じ講師が担当します。
            <br />
            もちろん週によっては、講師側の私事により別の講師が担当することもございますが、
            引き継ぎを行いますのでご安心ください。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>
            オンライン指導の科目を毎週変えることはできますか？
          </TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            申し訳ございませんが、できません。
            <br />
            月に4回の固定授業は、同じ科目で受講いただきます。
            もし複数科目の受講をされたい場合は、別でコマをお取りいただく形になります。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
      <CustomAccordion>
        <CustomAccordionSummary>
          <QTypography />
          <TitleTypography>
            質問回答サービスでは、オンライン指導で受講している科目以外の質問もできますか？
          </TitleTypography>
        </CustomAccordionSummary>
        <CustomAccordionDetails>
          <DescriptionTypography>
            もちろん可能です。
            <br />
            質問回答サービスでは、算数や理科などのわからない問題をいつでも質問していただくことができます。
          </DescriptionTypography>
        </CustomAccordionDetails>
      </CustomAccordion>
    </>
  );
};
