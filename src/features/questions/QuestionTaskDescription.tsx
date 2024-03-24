import {
  Accordion,
  AccordionDetails,
  Box,
  AccordionSummary,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";

export const QuestionTaskDescription = () => {
  return (
    <>
      <HeadlineTypography>質問回答タスクの進め方</HeadlineTypography>
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
              タスクの承認をする
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={1}>
              <Box textAlign="left">
                　質問が割り当てられると、GoogleChatにメッセージがきます。
                <br />
                <br />
                　そのメッセージから質問へのリンクにアクセスすると、
                質問を拒否するボタンと質問を確認するボタンがあります。
                <br />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    component="img"
                    src="/img/confirmation-reject-buttons.png"
                    alt="確認ボタンと拒否ボタン"
                    sx={{ width: "80%" }}
                  />
                </Box>
                <br />
                　質問への回答が可能であれば確認ボタンを、難しければ拒否ボタンを押します。
              </Box>
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
              動画を作成してYouTubeに投稿する
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={1} pl={2} pr={2}>
              <Box textAlign="left">
                YouTubeに投稿する際には、以下の点に注意してください。
                <br />
                <List>
                  <ListItem sx={{ pt: 0, pb: 0 }}>
                    <ListItemIcon>
                      <Checkbox checked={true} tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <ListItemText primary={"動画を限定公開にする"} />
                  </ListItem>
                  <ListItem sx={{ pt: 0, pb: 0 }}>
                    <ListItemIcon>
                      <Checkbox checked={true} tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <ListItemText
                      primary={"動画のタイトルを質問のタイトルに"}
                    />
                  </ListItem>
                  <ListItem sx={{ pt: 0, pb: 0 }}>
                    <ListItemIcon>
                      <Checkbox checked={true} tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <ListItemText primary={"概要欄にニックネームを追加する"} />
                  </ListItem>
                  <ListItem sx={{ pt: 0, pb: 0 }}>
                    <ListItemIcon>
                      <Checkbox checked={true} tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <ListItemText primary={"動画を再生リストに追加する"} />
                  </ListItem>
                </List>
              </Box>
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
              YouTubeのURLを回答する
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box mb={1} pl={2} pr={2}>
              <Typography textAlign="left">
                作成したYouTube動画のURLを、回答ボックスに入力します。
                <br />
                <br />
                あとは管理者からの承認が得られれば、業務は終了です。
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};
