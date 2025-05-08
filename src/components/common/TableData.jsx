import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";

function TableData({rows, columns, getRowId, paginationModel, pageSizeOptions, checkboxSelection, filterModel }) {
  const theme = useTheme();
  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={pageSizeOptions}
        checkboxSelection={checkboxSelection}
        disableColumnMenu
        filterModel={filterModel}
        sx={{
          border: 0,
          backgroundColor: theme.palette.background.layout,
          color: theme.palette.primary.contrastText,
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.palette.primary.light,
            color: "white",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: theme.palette.secondary.main,
          },
          "& .MuiDataGrid-row.Mui-selected": {
            backgroundColor: theme.palette.secondary.dark,
          },
          "& .MuiCheckbox-root": {
            color: theme.palette.primary.contrastText,
          },
          "& .MuiCheckbox-root.Mui-checked": {
            color: theme.palette.secondary.light,
          },
          "& .MuiDataGrid-row.Mui-selected:hover": {
            backgroundColor: theme.palette.secondary.main,
          },
          "& .MuiDataGrid-footer": {
            backgroundColor: "pink",
            color: theme.palette.primary.contrastText,
          },

          "& .MuiSelect-select": {
            color: theme.palette.primary.contrastText,
          },
          "& .MuiSelect-icon": {
            color: theme.palette.primary.contrastText,
          },
        }}
      />
    </>
  );
}

export default TableData;
