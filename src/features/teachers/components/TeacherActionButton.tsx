import { ButtonProps } from "@mui/material";
import { ActionButton } from "../../../components/Element/Button/ActionButton";

export const TeacherActionButton = (props: ButtonProps) => {
  return (
    <ActionButton id="teacher-action-button" {...props}>
      講師を操作する
    </ActionButton>
  );
};
