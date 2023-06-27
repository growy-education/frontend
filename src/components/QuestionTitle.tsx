import { Box, Typography } from "@mui/material";
import React from "react";

type TitleProps = {
  title: string;
};
export const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <Box margin="0.5em">
      <Typography align="left">{title}</Typography>
    </Box>
  );
};
