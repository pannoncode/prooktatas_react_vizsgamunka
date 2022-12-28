/**
 *  Funkciója:
 *   - A Centerline lista létrehozása menüpont
 *   - Itt lehet bevinni adatokat egy adott géphez és centerline típushoz
 *   - A bevitt adatok egy táblázat segítségével jelenítődnek meg az oldalon
 *   - (később ez a táblázat CRUD táblázattá kell válnia)
 */

import React, { Fragment, useState, useEffect } from "react";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import CreateCenterlineModal from "../Components/Modal/CreateCenterlineModal";
import Success from "../Components/UI/Success/Success";
import Table from "../Components/Table/Table";

import { getAllMachineNumbersFromDb } from "../store/machineNumbers-actions";
import { getAllCenterlineTypes } from "../store/centerlineTypes-actions";
import { fetchCenterlineList } from "../store/centerlineList-actions";

import machineNumberSlice from "../store/machineNumbers-slice";
import centerlineTypes from "../store/centerlineTypes-slice";
import centerlineListSlice from "../store/centerlineList-slice";
import errorFeedbackSlice from "../store/errorFeedback-slice";
import titleSlice from "../store/title-slice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ExportData from "../Components/ExportData/ExportData";

const style = {
  boxTable: {
    ml: "1rem",
    mb: "10rem",
  },
  circularProg: {
    textAlign: "center",
    mt: 10,
  },
};

const CreateCenterlineLists = () => {
  const [open, setOpen] = useState(false);
  const [succes, setSucces] = useState(false);

  const dispatch = useDispatch();

  const centerlineList = useSelector(
    (state) => state.centerlineList.centerlineDatas
  );
  const machineNumbers = useSelector(
    (state) => state.machineNumbers.allMachineNumbers
  );
  const clTypes = useSelector((state) => state.centerlineTypes.clTypes);
  const isLoading = useSelector((state) => state.checkLoading.loading);

  useEffect(() => {
    dispatch(fetchCenterlineList());
    dispatch(getAllMachineNumbersFromDb());
    dispatch(getAllCenterlineTypes());
    dispatch(titleSlice.actions.setTitle("Centerline lista létrehozása"));

    return () => {
      dispatch(machineNumberSlice.actions.clearMachineNumbers());
      dispatch(machineNumberSlice.actions.clearAllMachineNumbers());
      dispatch(centerlineTypes.actions.clearClTypes());
      dispatch(centerlineTypes.actions.clearAllClTypes());
      dispatch(centerlineListSlice.actions.clearCenterlineDatas());
      dispatch(titleSlice.actions.clearTitle());
      dispatch(titleSlice.actions.clearMachineNumberTitle());
      dispatch(titleSlice.actions.clearCenterlineTypeTitle());
    };
  }, [dispatch, succes]);

  const modalOpenHandler = () => {
    setOpen(true);
  };

  const closeExitHandler = () => {
    setOpen(false);
    setOpen(false);
    dispatch(errorFeedbackSlice.actions.isNotError());
  };

  const closeModalHandler = (suc) => {
    if (suc) {
      setOpen(false);
      setSucces(true);
      setTimeout(() => {
        setSucces(false);
      }, 2000);
    }
  };

  const columns = [
    {
      field: "machineNumber",
      headerName: "Gépszám",
      headerClassName: "headerStyle",
      width: 80,
    },
    {
      field: "partOfMachine",
      headerName: "Géprész",
      headerClassName: "headerStyle",
      width: 150,
    },
    {
      field: "clName",
      headerName: "Centerline neve",
      headerClassName: "headerStyle",
      width: 500,
    },
    {
      field: "check",
      headerName: "Futó/Álló",
      headerClassName: "headerStyle",
      width: 150,
    },
    {
      field: "qaCritics",
      headerName: "QA kritikus?",
      headerClassName: "headerStyle",
      width: 100,
    },
    {
      field: "minTarget",
      headerName: "Minimum",
      headerClassName: "headerStyle",
      width: 100,
    },
    {
      field: "target",
      headerName: "Cél",
      headerClassName: "headerStyle",
      width: 100,
    },
    {
      field: "maxTarget",
      headerName: "Maximum",
      headerClassName: "headerStyle",
      width: 100,
    },
    {
      field: "measure",
      headerName: "Mértékegység",
      headerClassName: "headerStyle",
      width: 150,
    },
    {
      field: "oplNumber",
      headerName: "OPL szám",
      headerClassName: "headerStyle",
      width: 150,
    },
    {
      field: "checkTime",
      headerName: "Ellenőrzés ideje",
      headerClassName: "headerStyle",
      width: 150,
    },
  ];

  const row = centerlineList.map((row, id) => ({
    key: id,
    id: id + 1,
    machineNumber: row.datas.machineNumber,
    partOfMachine: row.datas.partOfMachine,
    clName: row.datas.clName,
    check: row.datas.check,
    qaCritics: row.datas.qaCritics,
    minTarget: row.datas.minTarget,
    target: row.datas.target,
    maxTarget: row.datas.maxTarget,
    measure: row.datas.measure,
    oplNumber: row.datas.oplNumber,
    checkTime: row.datas.checkTime,
  }));

  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Button
          variant="contained"
          sx={{ m: "1rem", mt: "3rem" }}
          onClick={modalOpenHandler}
        >
          Lista létrehozása
        </Button>
        <ExportData
          exportData={row}
          content={"Centerline listák letöltése"}
          fileName={"cllist"}
        />
      </Box>

      {succes && (
        <Success severity="success" content="Sikeres lista lértehozás" />
      )}

      {open && (
        <CreateCenterlineModal
          open={open}
          onClose={closeModalHandler}
          exit={closeExitHandler}
          machineNumbers={machineNumbers}
          clTypes={clTypes}
        />
      )}
      {isLoading && (
        <Box sx={style.circularProg}>
          <CircularProgress size={60} />
        </Box>
      )}
      {!isLoading && (
        <Box sx={style.boxTable}>
          <Table
            columns={columns}
            rows={row}
            pageSize={15}
            rowsPerPageOptions={15}
          />
        </Box>
      )}
    </Fragment>
  );
};

export default CreateCenterlineLists;
