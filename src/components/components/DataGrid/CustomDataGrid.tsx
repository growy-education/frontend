import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowParams,
  GridRowProps,
} from "@mui/x-data-grid";

type CustomDataGridProps = {
  onRowClick: (params: GridRowParams) => void;
  rows: readonly any[];
  columns: (GridColDef<[GridRowProps]> & { order: number })[];
} & DataGridProps;

export const CustomDataGrid = ({
  onRowClick,
  rows,
  columns,
  ...props
}: CustomDataGridProps) => {
  return (
    <DataGrid
      onRowClick={onRowClick}
      autoHeight
      rows={rows}
      columns={columns}
      {...props}
    />
  );
};
