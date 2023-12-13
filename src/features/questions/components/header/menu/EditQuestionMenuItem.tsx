import { MenuItem, MenuItemProps, Typography } from "@mui/material";
import { useCallback } from "react";
import { Question } from "../../../types/question.class";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";

type EditQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const EditQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: EditQuestionMenuItemProps) => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(`/questions/${question.id}/edit`);
    onClick(null);
  }, [navigate, onClick, question.id]);

  return (
    <MenuItem
      onClick={handleClick}
      disableRipple
      color="primary.main"
      {...props}
    >
      <Edit color="primary" />
      <Typography color="primary" ml={1}>
        編集する
      </Typography>
    </MenuItem>
  );
};
