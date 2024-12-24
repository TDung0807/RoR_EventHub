import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface MyDataTableProp {
  columns: GridColDef[];
  rows: any;
  paginationModel: any;
  [key: string]: any; // This allows for additional props not explicitly defined
}

export const MyDataTable: React.FC<MyDataTableProp> = ({
  columns,
  rows,
  paginationModel,
  ...props
}) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      sx={{ border: 0 }}
      {...props}
    />
  );
};
