import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Question } from "../../dto/question.class";
import { AssignmentInd, FindReplace } from "@mui/icons-material";
import { useRef } from "react";

type ReassignQuestionFormProps = {
  question: Question;
} & BoxProps;

export const ReassignQuestionBox = ({
  question,
  ...props
}: ReassignQuestionFormProps) => {
  const sending = useRef(false);

  return (
    <Box {...props}>
      <FormControlLabel
        control={<Checkbox />}
        label={
          <Typography>
            自動で講師を選出する
            <FindReplace />
          </Typography>
        }
      />
      <TextField fullWidth id="reassigned-teacher-id" label="講師のID" />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        endIcon={<AssignmentInd />}
        disabled={sending.current}
      >
        講師を選び直す
      </Button>
    </Box>
  );
};
