import { Search } from "@mui/icons-material";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { GridColDef, GridRowProps } from "@mui/x-data-grid";
import React from "react";

type SearchDataGridProps = {
  defaultColumns: (GridColDef<[GridRowProps]> & { order: number })[];
  selectedColumn: string;
  setSelectedColumn: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
};

export const SearchDataGrid = ({
  defaultColumns,
  selectedColumn,
  setSelectedColumn,
  searchText,
  setSearchText,
  handleSearch,
}: SearchDataGridProps) => {
  return (
    <Grid container alignItems="center" mt={2} flexDirection={"row"}>
      <Grid item sx={{ width: "30%" }}>
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="search-select-label">検索列</InputLabel>
          <Select
            id="search-select"
            labelId="search-select-label"
            label="検索列"
            value={selectedColumn}
            onChange={(event) =>
              setSelectedColumn(event.target.value as string)
            }
          >
            <MenuItem value="">選択してください</MenuItem>
            {defaultColumns.map((column) => (
              <MenuItem key={column.field} value={column.field}>
                {column.headerName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ width: "70%" }}>
        <TextField
          fullWidth
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="検索"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
        />
      </Grid>
    </Grid>
  );
};
