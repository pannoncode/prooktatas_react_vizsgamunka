/**
 * Funkciója:
 *   - A Centerline eltérések menüpont
 *   - Itt jelenítődnek meg a centerline ellenőrzéskor bevitt adatok
 *   - Egy táblázat jeleníti meg az adatbázisból az adatokat
 */

import React, { Fragment, useEffect } from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Table from "../Components/Table/Table";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { fetchCenterlineDifferent } from "../store/centerlineDifferent-actions";
import centerlineListSlice from "../store/centerlineList-slice";
import titleSlice from "../store/title-slice";

import ExportData from "../Components/ExportData/ExportData";

const columns = [
  {
    field: "time",
    headerName: "Ellenőrzés időponja",
    headerClassName: "headerStyle",
    width: 150,
  },
  {
    field: "machineNumber",
    headerName: "Gépszám",
    headerClassName: "headerStyle",
    width: 130,
  },
  {
    field: "partOfMachine",
    headerName: "Géprész",
    headerClassName: "headerStyle",
    width: 200,
  },
  {
    field: "clName",
    headerName: "Centerline neve",
    headerClassName: "headerStyle",
    width: 500,
  },
  {
    field: "min",
    headerName: "Minimum",
    headerClassName: "headerStyle",
    width: 100,
    align: "center",
  },
  {
    field: "target",
    headerName: "Cél",
    headerClassName: "headerStyle",
    width: 110,
    align: "center",
  },
  {
    field: "max",
    headerName: "Maximum ",
    headerClassName: "headerStyle",
    width: 100,
    align: "center",
  },
  {
    field: "checkedValue",
    headerName: "Ellenőrzött érték",
    headerClassName: "headerStyle",
    width: 120,
    align: "center",
  },
  {
    field: "measure",
    headerName: "Mértékegység",
    headerClassName: "headerStyle",
    width: 110,
    align: "center",
  },
  {
    field: "valid",
    headerName: "CL OK?",
    headerClassName: "headerStyle",
    width: 110,
    align: "center",
  },
  {
    field: "diffName",
    headerName: "Kitöltő neve",
    headerClassName: "headerStyle",
    width: 150,
    align: "center",
  },
  {
    field: "reason",
    headerName: "Eltérés oka",
    headerClassName: "headerStyle",
    width: 500,
    align: "left",
  },
  {
    field: "sku",
    headerName: "SKU",
    headerClassName: "headerStyle",
    width: 110,
    align: "center",
  },
];

const style = {
  circularProg: {
    textAlign: "center",
    mt: 10,
  },
  tableBox: {
    mb: "20rem",

    "& .clOut": {
      backgroundColor: "red",
      color: "white",
    },
    "& .clOk": {
      backgroundColor: "green",
      color: "white",
    },
  },
  table: {
    mt: "1rem",
  },
};

const CenterlineDifferent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCenterlineDifferent());
    dispatch(titleSlice.actions.setTitle("Centerline eltérések"));

    return () => {
      dispatch(centerlineListSlice.actions.clearCenterlineDifferent());
      dispatch(titleSlice.actions.clearTitle());
      dispatch(titleSlice.actions.clearMachineNumberTitle());
      dispatch(titleSlice.actions.clearCenterlineTypeTitle());
    };
  }, [dispatch]);

  const centerlineDifferentFromRedux = useSelector(
    (state) => state.centerlineList.centerlineDifferent
  );

  const isLoading = useSelector((state) => state.checkLoading.loading);

  const row = centerlineDifferentFromRedux.map((row, id) => ({
    key: id,
    id: id + 1,
    time: row.time,
    machineNumber: row.machineNumber,
    partOfMachine: row.partOfMachine,
    clName: row.clName,
    min: row.min,
    target: row.target,
    max: row.max,
    checkedValue: row.checkedValue,
    measure: row.measure,
    valid: row.validate,
    diffName: row.name,
    reason: row.reason,
    sku: row.sku,
  }));

  return (
    <Fragment>
      <Box sx={{ mt: "7rem" }}>
        <ExportData
          exportData={row}
          content={"Eltérések letöltése"}
          fileName={"cldifferent"}
        />
      </Box>

      {isLoading && (
        <Box sx={style.circularProg}>
          <CircularProgress size={60} />
        </Box>
      )}
      {!isLoading && (
        <Box sx={style.tableBox}>
          <Table
            columns={columns}
            rows={row}
            pageSize={15}
            rowsPerPageOptions={15}
            sx={style.table}
          />
        </Box>
      )}
    </Fragment>
  );
};

export default CenterlineDifferent;
