import { Box, BoxProps, Typography } from "@mui/material";

type YetNoQuestionBoxProps = BoxProps;

export const YetNoQuestionBox = ({ ...props }: YetNoQuestionBoxProps) => {
  return (
    <Box {...props}>
      <Typography>まだ質問がありません</Typography>
    </Box>
  );
};
