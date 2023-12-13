import { Box, BoxProps, PaletteOptions, Typography } from "@mui/material";

import { QuestionStatus } from "../types/question-status.enum";
import { QuestionStatusIcon } from "./QuestionStatusIcon";

const statusText = (status: QuestionStatus) => {
  switch (status) {
    case QuestionStatus.AVAILABLE:
      return "視聴可能";
    case QuestionStatus.CHECKING:
      return "動画の確認中";
    case QuestionStatus.ASSIGNED:
    case QuestionStatus.PENDING:
      return "動画の作成中";
    case QuestionStatus.CANCELED:
      return "キャンセル済み";
  }
};

const statusColor = (status: QuestionStatus): keyof PaletteOptions => {
  switch (status) {
    case QuestionStatus.AVAILABLE:
      return "success";
    case QuestionStatus.CHECKING:
      return "info";
    case QuestionStatus.ASSIGNED:
    case QuestionStatus.PENDING:
      return "info";
    case QuestionStatus.CANCELED:
      return "warning";
  }
};

type QuestionStatusProps = {
  status: QuestionStatus;
} & BoxProps;

export const QuestionStatusBox = ({
  status,
  ...props
}: QuestionStatusProps) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        borderRadius: 2,
        border: (theme) =>
          `1px solid ${theme.palette[statusColor(status)]["main"]}`,
      }}
      {...props}
    >
      <Typography pl={1} color={`${statusColor(status)}.main`}>
        {statusText(status)}
      </Typography>
      <QuestionStatusIcon
        status={status}
        sx={{ color: `${statusColor(status)}.main` }}
      />
    </Box>
  );
};
