import React, { useContext, useState } from "react";
import { Add, ListAlt, Quiz } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContextProvider";
import { Role } from "../types/role.enum";

export const ListItemQuestion = () => {
  const [questionListOpen, setQuestionListOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(UserContext);

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
        <ListItemText primary="質問回答" />
      </ListItemButton>
      <Collapse in={questionListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/questions")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="質問リスト" />
            </ListItemButton>
          </ListItem>
          {user.role === Role.CUSTOMER && (
            <ListItem onClick={() => navigate("/questions/new")}>
              <ListItemButton>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="質問を作成" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
};
