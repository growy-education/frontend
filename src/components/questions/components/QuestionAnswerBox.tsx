import { Box, BoxProps, Typography } from "@mui/material";
import { Question } from "../../../dto/question.class";

type QuestionAnswerBoxProps = {
  answer: Question["answer"];
} & BoxProps<"iframe">;

export const QuestionAnswerBox = ({
  answer,
  ...props
}: QuestionAnswerBoxProps) => {
  const getYouTubePath = (url: string) => {
    if (url.includes("https://youtu.be/")) {
      const id = url.split("https://youtu.be/")[1];
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
    } else {
      return `https://www.youtube.com/embed/${url}`;
    }
  };

  if (!!!answer) {
    return <Typography>まだ回答動画が作成されていません</Typography>;
  }

  return (
    <Box mt={2} pb="56.25%" position="relative" {...props}>
      <Box
        component="iframe"
        width="100%"
        height="100%"
        src={getYouTubePath(answer)}
        title="回答動画"
        allowFullScreen
        sx={{ position: "absolute", top: 0, left: 0 }}
        onError={() => console.log("エラー！")}
      />
    </Box>
  );
};
