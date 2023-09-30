import { Box, BoxProps, Divider, Menu, MenuItem } from "@mui/material";
import { Question } from "../../dto/question.class";
import { useNavigate } from "react-router-dom";
import { BackToListButton } from "../components/BackToListButton";
import { QuestionActionButton } from "./QuestionActionButton";
import { useContext, useState } from "react";
import { QuestionActionMenu } from "./QuestionActionMenu";
import { EditQuestionMenuItem } from "./EditQuestionMenuItem";
import { CancelQuestionMenuItem } from "./CancelQuestionMenuItem";
import { ReportQuestionMenuItem } from "./ReportQuestionMenuItem";
import { RolesGuard } from "../../tools/RolesGuard";
import { Role } from "../../dto/enum/role.enum";
import { RejectQuestionMenuItem } from "./RejectQuestionMenuItem";
import { DeleteQuestionMenuItem } from "./DeleteQuestionMenuItem";
import { QuestionStatusesGuard } from "../../tools/QuestionStatusesGuard";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { ConfirmQuestionMenuItem } from "./ConfirmQuestionMenuItem";
import { UserContext } from "../../contexts/UserContextProvider";

type QuestionHeaderBoxProps = {
  question: Question;
} & BoxProps;

export const QuestionHeaderBox = ({
  question,
  ...props
}: QuestionHeaderBoxProps) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...props}
    >
      <BackToListButton onClick={() => navigate(`/questions`)} />
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
        <RolesGuard roles={[Role.ADMIN, Role.CUSTOMER]}>
          <QuestionStatusesGuard
            question={question}
            statuses={[QuestionStatus.PENDING, QuestionStatus.ASSIGNED]}
          >
            <CancelQuestionMenuItem question={question} onClick={handleClose} />
          </QuestionStatusesGuard>
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
        <Divider />
        <RolesGuard roles={[Role.TEACHER]}>
          <ReportQuestionMenuItem question={question} onClick={handleClose} />
        </RolesGuard>
        <RolesGuard roles={[Role.CUSTOMER, Role.ADMIN]}>
          <QuestionStatusesGuard
            question={question}
            statuses={[QuestionStatus.CANCELED, QuestionStatus.AVAILABLE]}
          >
            <DeleteQuestionMenuItem question={question} onClick={handleClose} />
          </QuestionStatusesGuard>
        </RolesGuard>
      </QuestionActionMenu>
    </Box>
  );
};
