import { Box, Typography } from "@mui/material";
import React from "react";

type QuestionTitleProps = {
  title: string;
};
export const QuestionTitle: React.FC<QuestionTitleProps> = ({ title }) => {
  return (
    <Box margin="0.5em">
      <Typography align="left">{title}</Typography>
    </Box>
  );
};
