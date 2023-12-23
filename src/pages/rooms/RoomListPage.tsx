import { Box, Typography } from "@mui/material";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoomCalendar } from "../../features/rooms/components/calendar/RoomCalendar";
import { useRooms } from "../../features/rooms/api/getRooms";
import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";

type CustomGridColDef = GridColDef & { order: number };

const RoomColumns: CustomGridColDef[] = [
  { field: "id", headerName: "ID", flex: 1, order: 1 },
  { field: "createdAt", headerName: "作成日時", flex: 1, order: 2 },
  { field: "updatedAt", headerName: "更新日時", flex: 1, order: 3 },
  { field: "startAt", headerName: "開始時間", flex: 1, order: 4 },
  { field: "endAt", headerName: "終了時間", flex: 1, order: 5 },
  { field: "url", headerName: "URL", flex: 1, order: 6 },
  { field: "status", headerName: "ステータス", flex: 1, order: 7 },
];

export const RoomListPage = () => {
  const { isLoading, isError, data: rooms } = useRooms();

  if (isLoading) {
    return <LoadingBox message="オンライン自習室を取得中..." />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="ネットワークエラーが発生しました"
        description="情報の取得に失敗しました"
      />
    );
  }

  return (
    <>
      <PageTitleTypography>オンライン自習室</PageTitleTypography>
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Typography variant="h6">カレンダー</Typography>
        <Typography>日付をクリックすると、詳細画面へと遷移します。</Typography>
        <Box sx={{ width: "100%" }}>
          <RoomCalendar rooms={rooms} />
        </Box>
      </Box>
    </>
  );
};
