import { Box, BoxProps, Typography } from "@mui/material";
import { Question } from "../../../dto/question.class";
import { getEmbedYouTubePath } from "../../../tools/get-youtube-path";

type QuestionAnswerBoxProps = {
  answer: Question["answers"][0];
} & BoxProps<"iframe">;

export const QuestionAnswerBox = ({
  answer,
  ...props
}: QuestionAnswerBoxProps) => {
  if (!!!answer) {
    return <Typography>まだ回答動画が作成されていません</Typography>;
  }

  return (
    <Box mt={2} pb="56.25%" position="relative" {...props}>
      <Box
        component="iframe"
        width="100%"
        height="100%"
        src={getEmbedYouTubePath(answer)}
        title="回答動画"
        allowFullScreen
        sx={{ position: "absolute", top: 0, left: 0 }}
        onError={() => console.log("エラー！")}
      />
    </Box>
  );
};
