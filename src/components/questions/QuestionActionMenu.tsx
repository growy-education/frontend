import { Menu, MenuProps } from "@mui/material";

export const QuestionActionMenu = (props: MenuProps) => {
  return (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id="question-action-menu"
      MenuListProps={{
        "aria-labelledby": "question-action-button",
      }}
      {...props}
    />
  );
};
