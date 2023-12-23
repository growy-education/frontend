import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Room } from "../../features/rooms/types/room.class";
import { plainToInstance } from "class-transformer";
import { Box, Container } from "@mui/material";
import { LoadingBox } from "../../features/LoadingData";
import { axios } from "../../tools/axios";
import { HeaderBox } from "../../components/Layout/HeaderBox";
import { BackButton } from "../../components/Element/Button/BackButton";
import { RoomActionMenuButton } from "../../features/rooms/components/header/RoomActionMenuButton";
import { useRoom } from "../../features/rooms/api/getRoom";
import { AlertBox } from "../../features/AlertBox";
import { RoomDetail } from "../../features/rooms/RoomDetail";

export const RoomDetailPage = () => {
  const { roomId } = useParams();

  const {
    data: room,
    isError,
    isLoading,
  } = useRoom({
    roomId,
  });

  if (!!!roomId) {
    return <Navigate to="/rooms" />;
  }

  if (isLoading) {
    return <LoadingBox message="情報を取得中です" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラーが発生しました"
        description="情報の取得に失敗しました。"
      />
    );
  }

  return (
    <Container maxWidth="md">
      <HeaderBox>
        <BackButton />
        <RoomActionMenuButton room={room} />
      </HeaderBox>
      <Box my={3}>
        <RoomDetail room={room} />
      </Box>
    </Container>
  );
};
