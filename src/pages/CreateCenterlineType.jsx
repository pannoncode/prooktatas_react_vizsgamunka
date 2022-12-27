/**
 *  Funkciója:
 *   - a Centerline típus létrehozása menüpont
 *   - itt lehet létrehozni különböző típusú centerlineokat
 *   - egy validálás után az adatokat elküldi az adatbázisba
 *   - egy táblázat segítségével megjelennek az adatbázisban lévő adatok
 *   - validálja, hogy létező típusokat nem engedd újra bevinni
 *   - validálja, hogy nem megfelelő karaktereket nem enged bevinni
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

import { getAllCenterlineTypes } from "../store/centerlineTypes-actions";
import centerlineTypes from "../store/centerlineTypes-slice";
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

const CreateCenterlineType = () => {
  const [validCltype, setValidCltype] = useState(false);
  const [errorContent, setErrorContent] = useState("");
  const [deleteRow, setDeleteRow] = useState(false); // csak a törölt sorok megjelenítése miatt
  const inputClType = useRef();
  const dispatch = useDispatch();

  const errorFeedback = useSelector((state) => state.checkLoading.error);
  const allTypes = useSelector((state) => state.centerlineTypes.clTypes);
  const allClType = useSelector((state) => state.centerlineTypes.clAllTypes);

  useEffect(() => {
    dispatch(getAllCenterlineTypes());
    dispatch(titleSlice.actions.setTitle("Centerline típus létrehozása"));

    return () => {
      dispatch(centerlineTypes.actions.clearClTypes());
      dispatch(centerlineTypes.actions.clearAllClTypes());
      dispatch(titleSlice.actions.clearTitle());
      dispatch(titleSlice.actions.clearMachineNumberTitle());
      dispatch(titleSlice.actions.clearCenterlineTypeTitle());
    };
  }, [dispatch, validCltype]);

  const sendClType = () => {
    const inputContent = inputClType.current.value.trim();
    const invalid = inputContent.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&");

    if (inputContent === "" || invalid !== null) {
      dispatch(checkLoading.actions.isError());
      setErrorContent(
        "A beírt centerline típus érvénytelen karaktereket tartalmaz vagy üres a mező!"
      );
      setTimeout(() => {
        dispatch(checkLoading.actions.isNotError());
      }, 2000);
      return;
    }

    for (const type of allTypes) {
      if (type === inputContent) {
        dispatch(checkLoading.actions.isError());
        setErrorContent("Ez a típus már létezik");
        setTimeout(() => {
          dispatch(checkLoading.actions.isNotError());
        }, 2000);
        return;
      }
    }

    postData(
      "https://projectcenterlines-default-rtdb.europe-west1.firebasedatabase.app/centerlintypes.json/",
      "POST",
      { id: parseInt(Math.random() * 134), name: inputContent }
    );
    setValidCltype(true);
    setTimeout(() => {
      setValidCltype(false);
    }, 2000);
    inputClType.current.value = "";
  };

  const deleteIconHandler = (event, row) => {
    setDeleteRow(true);
    setErrorContent(
      `Az alábbi gépszámot szeretted volna törölni => ${row.clType}, de ez még nem működik`
    );
    setTimeout(() => {
      setDeleteRow(false);
    }, 2500);
  };

  const columns = [
    {
      field: "clType",
      headerName: "Centerline Típus",
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

  const row = allClType.map((row) => ({
    key: row.id,
    id: row.id,
    clType: row.name,
  }));

  return (
    <Fragment>
      <Box component="form" sx={style.box} noValidate autoComplete="off">
        <Paper elevation={3} sx={style.paper}>
          <Box sx={style.boxTypo}>
            <Typography variant="h6">Adj hozzá új Centerline típust</Typography>
          </Box>
          <TextField
            id="cltype"
            label="Új Centerline típus"
            variant="standard"
            inputRef={inputClType}
          />
          <Button sx={style.button} variant="contained" onClick={sendClType}>
            Létrehozás
          </Button>
          <Paper elevation={12}>
            {errorFeedback && <Error content={errorContent} severity="error" />}
            {validCltype && (
              <Success content="Sikeres létrehozás" severity="success" />
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

export default CreateCenterlineType;
