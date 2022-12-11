import React, { Fragment } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const dataGridStyle = {
  header: {
    ml: "auto",
    mr: "auto",
    mt: "1rem",
    height: 400,
    width: "98%",
    "& .headerStyle": {
      backgroundColor: "#160D08",
      color: "white",
      "&:hover": {
        color: "white",
      },
    },
  },
};

const Table = (props) => {
  const rows = props.rows;
  const columns = props.columns;
  const pageSizes = props.pageSize;
  const rowsPerPageOptions = props.rowsPerPageOptions;

  return (
    <Fragment>
      <Box sx={dataGridStyle.header}>
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: "time", sort: "desc" }],
            },
          }}
          autoHeight
          rows={rows}
          columns={columns}
          getCellClassName={(params) => {
            if (params.field === "valid") {
              return params.value === "NOK" ? "clOut" : "clOk";
            }
          }}
          pageSize={pageSizes}
          rowsPerPageOptions={[rowsPerPageOptions]}
          density="compact"
          onRowClick={props.onRowClick ? props.onRowClick : null}
        />
      </Box>
    </Fragment>
  );
};

export default Table;
