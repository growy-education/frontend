import React, { useContext, useState } from "react";
import { AddCircle, ListAlt, ManageAccounts, Quiz } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../../../features/users/types/role.enum";
import { AuthContext } from "../../../providers/auth.provider";

export const ListItemQuestion = () => {
  const [questionListOpen, setQuestionListOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);

  const handleQuestionListToggle = () => {
    setQuestionListOpen(!questionListOpen);
  };

  return (
    <>
      <ListItemButton
        onClick={handleQuestionListToggle}
        selected={location.pathname.includes("questions")}
      >
        <ListItemIcon>
          <Quiz />
        </ListItemIcon>
        <ListItemText primary="質問回答　　　" />
      </ListItemButton>
      <Collapse in={questionListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {user.role === Role.CUSTOMER && (
            <ListItem onClick={() => navigate("/questions/new")}>
              <ListItemButton>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="質問する" />
              </ListItemButton>
            </ListItem>
          )}
          {user.role === Role.ADMIN && (
            <ListItem onClick={() => navigate("/questions/new")}>
              <ListItemButton>
                <ListItemIcon>
                  <ManageAccounts />
                </ListItemIcon>
                <ListItemText primary="講師研修" />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem onClick={() => navigate("/questions")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="質問リスト" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
