import {
  Accordion,
  AccordionDetails,
  Box,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { Check, ExpandMore } from "@mui/icons-material";

export const NewUpdatesAccordion = () => {
  return (
    <>
      <Typography variant="h4" textAlign="left">
        最新アップデート内容
      </Typography>
      <Box sx={{ background: "transparent" }}>
        <Accordion
          sx={{
            background: "transparent",
            boxShadow: "none",
            justifyContent: "center",
            borderRadius: 0,
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMore fontSize="large" sx={{ color: "primary.main" }} />
            }
          >
            <Typography variant="h5" color="primary.main" textAlign="left">
              質問回答がWebサイトで利用可能に
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={1}>
              <Typography textAlign="left">
                　ご利用の生徒・保護者の皆様から好評だった質問回答なのですが、
                同様に不満の声もありました。
              </Typography>
            </Box>
            <Box ml={0.5} mr={0.5} mb={1}>
              <Box display="flex" m={0.1}>
                <Check fontSize="small" />
                <Typography textAlign="left">
                  質問画像と回答動画を一緒に見たい
                </Typography>
              </Box>
              <Box display="flex" m={0.1}>
                <Check fontSize="small" />
                <Typography textAlign="left">
                  今までの質問を一覧で見たい
                </Typography>
              </Box>
              <Box display="flex" m={0.1}>
                <Check fontSize="small" />
                <Typography textAlign="left">
                  質問を編集・キャンセルができない
                </Typography>
              </Box>
            </Box>
            <Box mb={1}>
              <Typography textAlign="left">
                　これらの声に応えるために、GrowyはWebサイトにログイン機能を導入し、
                質問回答サービスをGoogleフォームから移行することに決定しました。
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            background: "transparent",
            boxShadow: "none",
            justifyContent: "center",
            borderRadius: 0,
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMore fontSize="large" sx={{ color: "primary.main" }} />
            }
          >
            <Typography variant="h5" color="primary.main" textAlign="left">
              今後のWebサイトについて
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={1}>
              <Typography textAlign="left">
                　今回のWeb版質問回答が好評であれば、
                オンライン自習室や過去問・模試動画添削などの各種サービスもWebサイトへと移行するなど、
                今後もWebサイトの機能を拡充していくつもりです。
              </Typography>
            </Box>
            <Box mb={1}>
              <Typography textAlign="left">
                Webサイトについて何か意見・感想等あれば、
                GoogleChatでスタッフまでお伝えください。
              </Typography>
            </Box>
            <Box mb={2}>
              <Typography textAlign="left">
                　これからも個別指導塾Growyをよろしくお願いいたします。
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
