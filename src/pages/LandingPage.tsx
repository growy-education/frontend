import { Alert, Box, Snackbar, styled } from "@mui/material";
import { FAQ } from "../components/lp/faq/FAQ";
import { Header } from "../components/lp/header/Header";
import { LineButton } from "../components/lp/LineButton";
import { MessageAccordion } from "../components/lp/MessageAccordion";
import { MessageMovie } from "../components/lp/MessageMovie";
import { Onayami } from "../components/lp/Onayami";
import { PVMovie } from "../components/lp/PVMovie";
import { About } from "../components/lp/About";
import { Teachers } from "../components/lp/Teachers";
import { TargetStudents } from "../components/lp/components/TargetStudents";
import { Voice } from "../components/lp/components/Voice";
import { Price } from "../components/lp/components/Price";
import { YushinMessage } from "../components/lp/components/YushinMessage";
import { Footer } from "../components/lp/Footer";
import { DescriptionBox } from "../components/lp/components/DescriptionBox";
import { useState } from "react";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const LandingPage = () => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <Header />

      <Box
        component="main"
        width="md"
        maxWidth="500px"
        overflow="hidden"
        style={{ margin: "0 auto" }}
      >
        <Offset />

        {/* コーチング募集予約待ちのお知らせ */}
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="info"
            sx={{ width: "100%" }}
          >
            現在コーチングの生徒が満員となったため、コーチングの募集は予約待ちとなっております。
          </Alert>
        </Snackbar>

        {/* PV */}
        <Box component="section" id="kv">
          <Box
            style={{
              backgroundColor: "#25372F",
            }}
          >
            <PVMovie />
          </Box>
        </Box>

        {/* メッセージ */}
        <Box
          component="section"
          id="message"
          mt={2}
          mb={2}
          pt={2}
          pb={2}
          style={{
            backgroundImage: "url(./img/bg-note-min.jpg)",
            backgroundSize: "80% auto",
            backgroundRepeat: "repeat",
          }}
        >
          <MessageMovie />
          <MessageAccordion />
        </Box>

        {/* 保護者のお悩み */}
        <Box component="section" className="onayami" mt={2} pt={2}>
          <Onayami />
        </Box>

        {/* 個別指導塾Growyについて */}
        <Box component="section" id="about">
          <About />
        </Box>

        {/* 講師紹介 */}
        <Box component="section" id="teachers">
          <Teachers />
        </Box>

        {/* 対象の生徒 */}
        <Box component="section" id="students">
          <TargetStudents />
        </Box>

        {/* 保護者様の声 */}
        <Box component="section" id="voice">
          <Voice />
        </Box>

        {/* 料金 */}
        <Box component="section" id="price">
          <Price />
        </Box>

        {/* FAQ */}
        <Box component="section" id="faq">
          <FAQ />
        </Box>

        {/* 代表からのメッセージ */}
        <Box component="section" id="message-2">
          <YushinMessage />
        </Box>
      </Box>

      <LineButton />

      <Footer />
    </>
  );
};
