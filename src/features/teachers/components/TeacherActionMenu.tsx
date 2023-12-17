import { MenuProps } from "@mui/material";
import { ActionMenu } from "../../../components/Element/Menu/ActionMenu";

export const TeacherActionMenu = (props: MenuProps) => {
  return (
    <ActionMenu
      id="teacher-action-menu"
      MenuListProps={{
        "aria-labelledby": "teacher-action-button",
      }}
      {...props}
    />
  );
};
