import { Container, Typography } from "@mui/material";
import { FAQCoaching, FAQService, FAQTeaching } from "./FAQs";
import {
  CustomAccordion,
  CustomAccordionDetails,
  CustomAccordionSummary,
} from "../CustomAccordions";

export const FAQ = () => {
  return (
    <>
      <img
        src="/img/ttl-faq-sp-min.jpg"
        alt="よくあるご質問FAQ"
        style={{ width: "100%" }}
      />
      <Container style={{ background: "transparent", marginTop: "2rem" }}>
        <CustomAccordion>
          <CustomAccordionSummary>
            <Typography variant="h4">サービス全般について</Typography>
          </CustomAccordionSummary>
          <CustomAccordionDetails>
            <FAQService />
          </CustomAccordionDetails>
        </CustomAccordion>

        <CustomAccordion>
          <CustomAccordionSummary>
            <Typography variant="h4">コーチングについて</Typography>
          </CustomAccordionSummary>
          <CustomAccordionDetails>
            <FAQCoaching />
          </CustomAccordionDetails>
        </CustomAccordion>

        <CustomAccordion>
          <CustomAccordionSummary>
            <Typography variant="h4">ティーチングについて</Typography>
          </CustomAccordionSummary>
          <CustomAccordionDetails>
            <FAQTeaching />
          </CustomAccordionDetails>
        </CustomAccordion>
      </Container>
    </>
  );
};
