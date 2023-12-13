import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { GridColDef } from "@mui/x-data-grid";

type CustomColumns = (GridColDef & {
  order: number;
})[];

type EditDataGridProps = {
  defaultColumns: CustomColumns;
  columns: CustomColumns;
  setColumns: React.Dispatch<React.SetStateAction<CustomColumns>>;
};

export const EditDataGrid = ({
  defaultColumns,
  columns,
  setColumns,
}: EditDataGridProps) => {
  const [open, setOpen] = useState(false);

  const fieldChecked = (fieldName: CustomColumns[number]["field"]) => {
    return columns.findIndex((column) => column.field === fieldName) !== -1;
  };

  const sortColumns = (
    columns: typeof defaultColumns
  ): typeof defaultColumns => {
    return [...columns].sort((a, b) => a.order - b.order);
  };

  const addColumn = (field: CustomColumns[number]["field"]) => {
    const columnToAdd = defaultColumns.find((column) => column.field === field);
    if (columnToAdd) {
      const newColumns = [...columns, columnToAdd];
      setColumns(sortColumns(newColumns));
    }
  };

  const removeColumn = (field: (typeof defaultColumns)[number]["field"]) => {
    const newColumns = columns.filter((column) => column.field !== field);
    setColumns(sortColumns(newColumns));
  };

  const handleSwitchChange = (
    fieldName: (typeof defaultColumns)[number]["field"],
    check: boolean
  ) => {
    if (check) {
      addColumn(fieldName);
    } else {
      removeColumn(fieldName);
    }
  };

  return (
    <Accordion expanded={open} onChange={() => setOpen(!open)}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls="1" id="1">
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          テーブルの編集
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          テーブルに表示する列を変更できます
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {defaultColumns.map((column) => (
          <FormControlLabel
            key={`FormControlLabel${column.field}`}
            label={column.headerName}
            control={
              <Switch
                checked={fieldChecked(column.field)}
                onChange={(event) =>
                  handleSwitchChange(column.field, event.target.checked)
                }
              />
            }
          />
        ))}
      </AccordionDetails>
    </Accordion>
  );
};
