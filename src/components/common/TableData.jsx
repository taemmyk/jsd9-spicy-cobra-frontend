import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";

function TableData({
  rows,
  columns,
  getRowId,
  paginationModel,
  pageSizeOptions,
  checkboxSelection,
  filterModel,
  onRowClick,
}) {
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
        onRowClick={onRowClick}
        sx={{
          border: 0,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.primary.contrastText,
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: theme.palette.background.layout,
            color: theme.palette.secondary.light,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: theme.palette.background.layout,
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
            backgroundColor: theme.palette.background.layout,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.layout,
            color: theme.palette.secondary.light,
          },

          "& .MuiTablePagination-root": {
            backgroundColor: theme.palette.background.layout,
          },

          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              color: theme.palette.secondary.light,
            },

          "& .MuiSelect-select, & .MuiSelect-icon": {
            color: theme.palette.secondary.light,
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
