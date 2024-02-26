import { Box, BoxProps, Checkbox, FormControlLabel } from "@mui/material";

export const QuestionAnswerCheckBox = (props: BoxProps) => {
  return (
    <Box display="flex" flexDirection="column" m={1} {...props}>
      <FormControlLabel
        required
        control={<Checkbox />}
        label="動画のタイトルは正しく設定しましたか？"
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="概要欄にニックネームを追加しましたか？"
      />
      <FormControlLabel
        required
        control={<Checkbox />}
        label="動画を限定公開に設定しましたか？"
      />
    </Box>
  );
};
