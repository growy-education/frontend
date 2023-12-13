import { SvgIconProps } from "@mui/material";
import { QuestionStatus } from "../types/question-status.enum";
import {
  Cancel,
  HowToReg,
  Pending,
  TaskAlt,
  Verified,
} from "@mui/icons-material";

type QuestionStatusIconProps = {
  status: QuestionStatus;
} & SvgIconProps;

export const QuestionStatusIcon = ({
  status,
  ...props
}: QuestionStatusIconProps) => {
  switch (status) {
    case QuestionStatus.AVAILABLE:
      return <Verified {...props} />;
    case QuestionStatus.CHECKING:
      return <TaskAlt {...props} />;
    case QuestionStatus.ASSIGNED:
      return <HowToReg {...props} />;
    case QuestionStatus.PENDING:
      return <Pending {...props} />;
    case QuestionStatus.CANCELED:
      return <Cancel {...props} />;
  }
};
