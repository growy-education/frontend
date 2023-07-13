import { IconProps } from "@mui/material";
import { QuestionStatus } from "../../../dto/enum/question-status.enum";
import {
  Cancel,
  HowToReg,
  Pending,
  TaskAlt,
  Verified,
} from "@mui/icons-material";

type QuestionStatusIconProps = {
  status: QuestionStatus;
} & IconProps;

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
