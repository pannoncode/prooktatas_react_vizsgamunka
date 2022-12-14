/**
 *  Funkciója:
 *   - a Gépszám  létrehozása menüpont
 *   - itt lehet létrehozni gépszámokat amihez hozzá lehet rendelni a centerline
 *     típusokat és a többi adatokat
 *   - egy validálás után az adatokat elküldi az adatbázisba
 *   - egy táblázat segítségével megjelennek az adatbázisban lévő adatok
 *   - validálja, hogy létező típusokat nem engedd újra bevinni
 *   - validálja, hogy csak szám típusokat enged létrehozni
 *   - (a törlés funkció ha lesz hozzá rendes backend)
 */
import React, { Fragment, useRef, useState, useEffect } from "react";

import Error from "../Components/UI/Error/Error";
import Success from "../Components/UI/Success/Success";
import Table from "../Components/Table/Table";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";

import { getAllMachineNumbersFromDb } from "../store/machineNumbers-actions";
import machineNumberSlice from "../store/machineNumbers-slice";
import titleSlice from "../store/title-slice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { postData } from "../store/postCenterlineData-actions";
import checkLoading from "../store/checkloading-slice";

const style = {
  box: {
    "& > :not(style)": { mt: "7rem", ml: "1rem", width: "49ch" },
  },
  boxTypo: {
    mb: "1rem",
  },
  paper: {
    padding: "1rem",
  },
  button: {
    ml: "2rem",
  },
  boxTable: {
    width: "300px",
    ml: "1rem",
  },
};

const CreateMachineNumber = () => {
  const [validMachineNumber, setValidMachineNumber] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [deleteRow, setDeleteRow] = useState(false); // csak a törölt sorok megjelenítése miatt
  const inputMachineNumber = useRef();
  const dispatch = useDispatch();

  const machineNumbers = useSelector(
    (state) => state.machineNumbers.allMachineNumbers
  );

  const machineNumbersWithKey = useSelector(
    (state) => state.machineNumbers.machineNumbers
  );

  const errorFeedback = useSelector((state) => state.checkLoading.error);

  useEffect(() => {
    dispatch(getAllMachineNumbersFromDb());
    dispatch(titleSlice.actions.setTitle("Gépszám létrehozása"));

    return () => {
      dispatch(machineNumberSlice.actions.clearMachineNumbers());
      dispatch(machineNumberSlice.actions.clearAllMachineNumbers());
      dispatch(titleSlice.actions.clearTitle);
      dispatch(titleSlice.actions.clearMachineNumberTitle());
      dispatch(titleSlice.actions.clearCenterlineTypeTitle());
    };
  }, [dispatch, validMachineNumber]);

  const sendMachineNumber = () => {
    const inputNumber = parseInt(inputMachineNumber.current.value.trim());
    if (isNaN(inputNumber) || inputNumber === 0) {
      dispatch(checkLoading.actions.isError());
      setErrorContent("Hibásan megadott gépszám!");
      setTimeout(() => {
        dispatch(checkLoading.actions.isNotError());
      }, 2000);
      return;
    }

    for (const numbers of machineNumbers) {
      if (numbers === inputNumber) {
        dispatch(checkLoading.actions.isError());
        setErrorContent("Ez a gépszám már létezik");
        setTimeout(() => {
          dispatch(checkLoading.actions.isNotError());
        }, 2000);
        return;
      }
    }

    postData(
      "https://projectcenterlines-default-rtdb.europe-west1.firebasedatabase.app/machineNumbers.json/",
      "POST",
      { id: parseInt(Math.random() * 134), name: inputNumber }
    );

    setValidMachineNumber(true);
    setTimeout(() => {
      setValidMachineNumber(false);
    }, 2000);
    inputMachineNumber.current.value = "";
  };

  const deleteIconHandler = (event, row) => {
    setDeleteRow(true);
    setErrorContent(
      `Az alábbi gépszámot szeretted volna törölni => ${row.machineNumber}, de ez még nem működik`
    );
    setTimeout(() => {
      setDeleteRow(false);
    }, 2500);
  };

  const columns = [
    {
      field: "machineNumber",
      headerName: "Gépszám",
      headerClassName: "headerStyle",
      width: 150,
    },
    {
      field: "delete",
      headerName: "Törlés",
      headerClassName: "headerStyle",
      width: 142,
      renderCell: (params) => {
        return (
          <DeleteIcon
            onClick={(event) => deleteIconHandler(event, params.row)}
          />
        );
      },
    },
  ];

  const row = machineNumbersWithKey.map((row) => ({
    key: row.id,
    id: row.id,
    machineNumber: row.name,
  }));

  return (
    <Fragment>
      <Box component="form" sx={style.box} noValidate autoComplete="off">
        <Paper elevation={3} sx={style.paper}>
          <Box sx={style.boxTypo}>
            <Typography variant="h6">Adj hozzá új Gépszámot</Typography>
          </Box>
          <TextField
            id="machineNumber"
            label="Új Gépszám"
            variant="standard"
            inputRef={inputMachineNumber}
          />
          <Button
            sx={style.button}
            variant="contained"
            onClick={sendMachineNumber}
          >
            Létrehozás
          </Button>
          <Paper elevation={12}>
            {errorFeedback && <Error content={errorContent} severity="error" />}
            {validMachineNumber && (
              <Success
                content="Sikeres gépszám létrehozás"
                severity="success"
              />
            )}
            {deleteRow && <Error content={errorContent} severity="warning" />}
          </Paper>
        </Paper>
      </Box>
      <Box sx={style.boxTable}>
        <Table
          columns={columns}
          rows={row}
          pageSize={15}
          rowsPerPageOptions={15}
        />
      </Box>
    </Fragment>
  );
};

export default CreateMachineNumber;
