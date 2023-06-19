import React, { useState } from "react";
import { Add, ListAlt, Quiz } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ListItemQuestion = () => {
  const navigate = useNavigate();
  const [questionListOpen, setQuestionListOpen] = useState(false);

  const handleQuestionListToggle = () => {
    setQuestionListOpen(!questionListOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleQuestionListToggle}>
        <ListItemIcon>
          <Quiz />
        </ListItemIcon>
        <ListItemText primary="質問回答" />
      </ListItemButton>
      <Collapse in={questionListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("questions")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="質問リスト" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("questions/create")}>
            <ListItemButton>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="質問を作成" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
