import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";

import { FAQ } from "../features/lp/faq/FAQ";
import { Header } from "../features/lp/header/Header";
import { FloatButtonBox } from "../features/lp/FloatButtonBox";
import { MessageAccordion } from "../features/lp/MessageAccordion";
import { MessageMovie } from "../features/lp/MessageMovie";
import { Onayami } from "../features/lp/onayami/Onayami";
import { PVMovie } from "../features/lp/PVMovie";
import { About } from "../features/lp/about/About";
import { Teachers } from "../features/lp/teachers/Teachers";
import { TargetStudents } from "../features/lp/components/TargetStudents";
import { Voice } from "../features/lp/voice/Voice";
import { Price } from "../features/lp/price/Price";
import { YushinMessage } from "../features/lp/components/YushinMessage";
import { Footer } from "../features/lp/footer/Footer";
import { Offset } from "../components/Layout/Offset";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
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

        {/* 2024年度募集のお知らせ */}
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
            2024年度の生徒様の募集開始いたしました！
            <br />
            コーチング、ティーチング共に、枠に限りがございますので、
            <br />
            ご興味ある方はお早めにお問い合わせください🙇‍♂️
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
        <Box component="section" mt={2} pt={2}>
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

      <FloatButtonBox>
        <Box
          p={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            component="a"
            display="block"
            href="https://line.me/R/ti/p/@208okwey"
            sx={{
              "&:hover": {
                opacity: "0.7",
              },
            }}
          >
            <img
              src="/img/img-btn-line-sp-min.png"
              alt="LINE登録はこちらフロートボタン"
              style={{ width: "100%", maxWidth: "15rem" }}
            />
          </Box>

          <Box width="2rem" />

          <Box
            display="block"
            sx={{
              "&:hover": {
                opacity: "0.7",
              },
            }}
            onClick={() => navigate("/home")}
          >
            <img
              src="/img/img-btn-member-sp-min.png"
              alt="ログインはこちらボタン"
              style={{ width: "100%", maxWidth: "15rem" }}
            />
          </Box>
        </Box>
      </FloatButtonBox>

      <Footer />
    </>
  );
};
