import { Box, Typography } from "@mui/material";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomerCalendar } from "../../components/rooms/CustomerCalendar";
import { Room } from "../../types/room.class";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { EditDataGrid } from "../../components/components/DataGrid/EditDataGrid";
import { SearchDataGrid } from "../../components/components/DataGrid/SearchDataGrid";
import { CustomDataGrid } from "../../components/components/DataGrid/CustomDataGrid";

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

export const RoomList = () => {
  const navigate = useNavigate();
  const { axiosConfig } = useAxiosConfig();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [columns, setColumns] = useState(RoomColumns);
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const handleRowClick = (params: GridRowParams) => {
    const rowId = params.id as string;
    navigate(`./${rowId}`);
  };

  const handleSearch = () => {
    // Search logic
    // Implement your search logic based on the selectedColumn and searchText
    // For example, filter the users array based on the selected column and search text
    // Update the filtered users in state
    console.log("いま!");
  };

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get("rooms")
      .then((response) => {
        const rooms = response.data.map((userJson: string) =>
          plainToInstance(Room, userJson)
        );
        setRooms(rooms);
      })
      .catch((error) => {
        console.log("error occurred at RoomList.tsx", error);
      });
  }, [axiosConfig]);

  return (
    <>
      <Typography variant="h4">オンライン自習室</Typography>
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Box sx={{ m: 2 }}>
          <Typography variant="h6">カレンダー</Typography>
          <Typography>
            日付をクリックすると、詳細画面へと遷移します。
          </Typography>
          <CustomerCalendar events={rooms} />
        </Box>

        <Box sx={{ m: 2 }}>
          <Typography variant="h6">オンライン自習室一覧</Typography>
          <Typography>自習室一覧を表示します。</Typography>
          <EditDataGrid
            defaultColumns={RoomColumns}
            columns={columns}
            setColumns={setColumns}
          />
          <SearchDataGrid
            defaultColumns={RoomColumns}
            selectedColumn={selectedColumn}
            setSelectedColumn={setSelectedColumn}
            searchText={searchText}
            setSearchText={setSearchText}
            handleSearch={handleSearch}
          />
          <CustomDataGrid
            onRowClick={handleRowClick}
            rows={rooms}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  );
};
