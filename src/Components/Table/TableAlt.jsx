/**
 * Funkciója:
 *     - Megjeleníti egy táblázatban az adatbázisban tárolt Centerline adatokat
 *     - Itt hívodík be a CenterlineCheckModal.jsx egy onClick eseménnyel ami a bevitt adatokat ellenőrzi és küldi tovább
 *     - A kiválasztott listaelemre kattintva összegyűjti a lista adatait amit tovább küld a CenterlineCheckModal.jsx-be
 *
 * Felépítése:
 * [1] - a modal "nyitására - zárására" használt useState
 * [2] - a rákattintott listaelem adatai tárolásához használt useState
 * [3] - hiba kezeléshez használt useState
 * [4] - egy Handler függvény ami egy listaelemre kattintva megnyitja a modal-t és összegyűjti a listaelemben lévő adatokat
 * [5] - modal bezárásához használ Handler függvény
 * [6] - hiba esetén kezeli a [3] található useState elemet
 */

import { useState, Fragment } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import CenterlineCheckModal from "../Modal/CenterlineCheckModal";

import Success from "../UI/Success/Success";

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: "#160D08",
  color: "white",
  padding: theme.spacing(1),
}));

const tableStyle = {
  tableContainer: {
    mt: "1rem",
    mb: "5rem",
    width: "98%",
    mx: "auto",
    boxShadow: 7,
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#777B7E",
  },
  tableRow: {
    "&:hover": {
      backgroundColor: "#F5F5F5",
      cursor: "pointer",
    },
    "&:last-child td, &:last-child th": { border: 0 },
  },
};

const TableAlt = (props) => {
  const [open, setOpen] = useState(false); //[1]
  const [selectedCenterline, setSelectedCenterline] = useState(); //[2]
  const [clCheckOk, setClCheckOk] = useState(false); //[3]

  const columns = props.columns;
  const rows = props.rows;
  const centerlineDatas = props.clDatas;

  //[4]
  const checkCenterlineHandler = (event) => {
    setOpen(true);
    let selectedTableRow = event.currentTarget.cells;
    let selectedData = [];

    for (const key in selectedTableRow) {
      selectedData.push(selectedTableRow[key].innerText);
    }
    setSelectedCenterline(selectedData);
  };

  //[5]
  const closeModal = () => {
    setOpen(false);
  };

  //[6]
  const checkedOkHandler = (error) => {
    if (error) {
      setClCheckOk(false);
    } else {
      setClCheckOk(true);
      setTimeout(() => {
        setClCheckOk(false);
      }, 1500);
    }
  };

  return (
    <Fragment>
      {open && (
        <CenterlineCheckModal
          open={open}
          onClose={closeModal}
          onData={selectedCenterline}
          machineNumber={props.machineNumber}
          onCheck={checkedOkHandler}
        />
      )}
      {centerlineDatas && (
        <TableContainer component={Paper} sx={tableStyle.tableContainer}>
          {!clCheckOk ? (
            <Div>
              {props.machineNumber} {props.tableTitle}
            </Div>
          ) : (
            <Success severity="success" content="Sikeres ellenőrzés" />
          )}
          <Table sx={tableStyle.table} aria-label="simple table">
            <TableHead sx={tableStyle.tableHead}>
              <TableRow>
                {columns.map((columns) => (
                  <TableCell align="left" key={columns.headerName}>
                    {columns.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  id={row.id}
                  sx={tableStyle.tableRow}
                  onClick={checkCenterlineHandler}
                >
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="left">{row.partOfMachine}</TableCell>
                  <TableCell align="left">{row.clName}</TableCell>
                  <TableCell align="left">{row.check}</TableCell>
                  <TableCell align="left">{row.qa}</TableCell>
                  <TableCell align="left">{row.min}</TableCell>
                  <TableCell align="left">{row.target}</TableCell>
                  <TableCell align="left">{row.max}</TableCell>
                  <TableCell align="left">{row.measure}</TableCell>
                  <TableCell align="left">{row.opl}</TableCell>
                  <TableCell align="left">{row.checTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
};
export default TableAlt;
