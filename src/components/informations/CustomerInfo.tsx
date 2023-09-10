import { Box, Typography } from "@mui/material";
import { RoomChip } from "../components/RoomChip";
import { QuestionChip } from "../components/QuestionChip";
import { TeachingChip } from "../components/TeachingChip";
import { CoachingChip } from "../components/CoachingChip";
import { CorrectionChip } from "../components/CorrectionChip";
import { NewUpdates } from "./NewUpdates";

export const CustomerInfo = () => {
  return (
    <>
      <Box sx={{ p: 1 }}>
        <Typography variant="h4" textAlign="left">
          ご契約中サービス
        </Typography>
        <Box m={1}>
          <Box m={0.5} display="inline-flex">
            <RoomChip color="info" />
          </Box>
          <Box m={0.5} display="inline-flex">
            <QuestionChip color="info" />
          </Box>
          <Box m={0.5} display="inline-flex">
            <CorrectionChip color="info" disabled />
          </Box>
          <Box m={0.5} display="inline-flex">
            <TeachingChip color="info" />
          </Box>
          <Box m={0.5} display="inline-flex">
            <CoachingChip color="info" disabled />
          </Box>
        </Box>
        <Typography variant="h4" textAlign="left">
          最新アップデート内容
        </Typography>
        <Box m={1}>
          <NewUpdates />
        </Box>
        <Typography variant="h4" textAlign="left">
          ホンネで中学受験の新着動画
        </Typography>
        <Box m={1} pb="56.25%" position="relative">
          <iframe
            width="100%"
            height="100%"
            src={"https://www.youtube.com/embed/?list=UU35PZPRvt3OBQ10dYj2k61w"}
            title="回答動画"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        </Box>
      </Box>
    </>
  );
};
