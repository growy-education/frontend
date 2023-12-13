import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import { Link } from "react-router-dom";
import { TitleTypography } from "../lp/components/TitleTypography";

export const Room = () => {
  const [preserved, setPreserved] = useState([]);
  const columns: GridColDef[] = [
    { field: "date", headerName: "日付", flex: 1 },
    { field: "time", headerName: "時間", flex: 1 },
  ];

  return (
    <>
      <TitleTypography>自習室リスト</TitleTypography>
      <Box sx={{ width: "100%" }}>
        <DataGrid autoHeight rows={preserved} columns={columns} />
      </Box>
      <Box margin="0.5em">
        <Link to="preservation">
          <Button color="primary" variant="contained">
            予約を更新する
          </Button>
        </Link>
      </Box>
    </>
  );
};
