import { useContext, useState } from "react";
import { BoxProps, Divider } from "@mui/material";

// ドメイン
import { Role } from "../../../users/types/role.enum";
import { Question } from "../../types/question.class";
import { QuestionStatus } from "../../types/question-status.enum";

// Authorization
import { RolesGuard } from "../../../../tools/RolesGuard";
import { QuestionStatusesGuard } from "../../../../tools/QuestionStatusesGuard";

// ボタン類
import { QuestionActionButton } from "./QuestionActionButton";

// メニュー系
import { QuestionActionMenu } from "./menu/QuestionActionMenu";
import { EditQuestionMenuItem } from "./menu/EditQuestionMenuItem";
import { CancelQuestionMenuItem } from "./menu/CancelQuestionMenuItem";
import { ReportQuestionMenuItem } from "./menu/ReportQuestionMenuItem";
import { RejectQuestionMenuItem } from "./menu/RejectQuestionMenuItem";
import { DeleteQuestionMenuItem } from "./menu/DeleteQuestionMenuItem";
import { ConfirmQuestionMenuItem } from "./menu/ConfirmQuestionMenuItem";
import { AddTaskToQuestionMenuItem } from "./menu/AddTaskToQuestionMenuItem";
import { AuthContext } from "../../../../providers/auth.provider";
import { BackButton } from "../../../../components/Element/Button/BackButton";
import { HeaderBox } from "../../../../components/Layout/HeaderBox";
import { RemindQuestionMenuItem } from "./menu/RemindQuestionMenuItem";

type QuestionHeaderBoxProps = {
  question: Question;
} & BoxProps;

export const QuestionHeaderBox = ({
  question,
  ...props
}: QuestionHeaderBoxProps) => {
  const { user } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderBox {...props}>
      <BackButton />
      <QuestionActionButton
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disabled={
          user.role === Role.TEACHER &&
          user.teacher.id !== question?.teacher?.id
        }
      />
      <QuestionActionMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <RolesGuard roles={[Role.ADMIN, Role.CUSTOMER]}>
          <EditQuestionMenuItem question={question} onClick={handleClose} />
        </RolesGuard>
        <RolesGuard roles={[Role.ADMIN]}>
          <RemindQuestionMenuItem question={question} onClick={handleClose} />
        </RolesGuard>
        <RolesGuard roles={[Role.ADMIN, Role.CUSTOMER]}>
          <CancelQuestionMenuItem question={question} onClick={handleClose} />
        </RolesGuard>
        <RolesGuard roles={[Role.TEACHER]}>
          <QuestionStatusesGuard
            question={question}
            statuses={[QuestionStatus.PENDING]}
          >
            <ConfirmQuestionMenuItem
              question={question}
              onClick={handleClose}
            />
          </QuestionStatusesGuard>
        </RolesGuard>
        <RolesGuard roles={[Role.TEACHER]}>
          <QuestionStatusesGuard
            question={question}
            statuses={[QuestionStatus.PENDING, QuestionStatus.ASSIGNED]}
          >
            <RejectQuestionMenuItem question={question} onClick={handleClose} />
          </QuestionStatusesGuard>
        </RolesGuard>
        <RolesGuard roles={[Role.TEACHER]}>
          <ReportQuestionMenuItem question={question} onClick={handleClose} />
        </RolesGuard>
        <RolesGuard roles={[Role.CUSTOMER]}>
          <QuestionStatusesGuard
            question={question}
            statuses={[QuestionStatus.CANCELED]}
          >
            <DeleteQuestionMenuItem question={question} onClick={handleClose} />
          </QuestionStatusesGuard>
        </RolesGuard>
        <RolesGuard roles={[Role.ADMIN]}>
          <DeleteQuestionMenuItem question={question} onClick={handleClose} />
        </RolesGuard>
        <RolesGuard roles={[Role.ADMIN]}>
          <Divider />
          <AddTaskToQuestionMenuItem
            question={question}
            onClick={handleClose}
          />
        </RolesGuard>
      </QuestionActionMenu>
    </HeaderBox>
  );
};
