/**
 * Funkciója:
 *       - A Centerline listák menüpontban a kiválasztott listaelemre kattintva ez a modal ugrik fel.
 *       - Összegyűjti a kiválasztott listaelem adatait ami props-ban érkezik és a beírt értékkel továbbküldi az adatbázisba.
 *
 * Felépítése:
 * [1]   - hibakezelésnél true-false értékkel kezeli az eseményt
 * [2]   - a bevitt érték "kinyeréséhez" van rá szükség
 * [3]   - a Modal ide van bekötve a megjelenéshez
 * [4]   - a sendCheckedClData.js-ben található validáció behivása
 *       - a bevitt érték itt kerül validálásra, hogy a cél értékektől eltér vagy megfelel és
 *         ez után kerül bele az adatbázisba a többi hozzá tartozó adattal
 * [5]   - a props.onData-ból érkező adatokat tárolja amit egy ciklussal gyűjt össze [6]
 * [7]   - a Küldés button onClick eseményére hívódik meg. Validálja a bevitt adatot (csak szám lehet) és tovább küldi
 * [7.1] - a beírt adat validálása, hogy minden esetben szám legyen
 * [7.2] - hiba kezelés, ha a bevitt érték nem szám vagy 0 akkor hibára fut
 * [7.3] - a [4] írt validáció és adatok küldése, a modal bezárása
 */

import React, { Fragment, useRef, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import BasicModal from "./Modal";
import CenterlineDeviationModal from "./CenterlineDeviationModal";
import ErrorModal from "./ErrorModal";

import SendingData from "../../hooks/sendCheckedClData";

import validationSlice from "../../store/validation-slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const componentStyle = {
  typhografTitle: {
    mb: 2,
  },
  inputField: {
    width: "100px",
  },
  textFieldBox: {
    display: "inline",
  },
  buttonBox: {
    mt: "1rem",
  },
  button: {
    mx: "1rem",
  },
  escButton: {
    mx: "1rem",
    backgroundColor: "white",
  },
};

const CenterlineCheckModal = (props) => {
  const [error, setError] = useState(false); //[1]
  const inputData = useRef(); //[2]
  const portalElement = document.getElementById("modal-root"); //[3]

  const { validateData: sendData } = SendingData(); //[4]

  let modalCenterlineDatas = {}; //[5]

  const dispatch = useDispatch();
  const validation = useSelector((state) => state.validation.validation);

  //[6]
  for (let i = 0; i < props.onData.length; i++) {
    modalCenterlineDatas = {
      id: props.onData[0],
      partOfMachine: props.onData[1],
      clName: props.onData[2],
      min: props.onData[5] ? props.onData[5] : null,
      target: props.onData[6],
      max: props.onData[7] ? props.onData[7] : null,
      measure: props.onData[8],
    };
  }

  //[7]
  const sendingDataHandler = () => {
    //[7.1]
    const numberCheck = /^\d+$/;
    let inputClValue = inputData.current.value.match(numberCheck);
    inputClValue = parseFloat(inputData.current.value.replace(",", ".").trim());

    //[7.2]
    if (isNaN(inputClValue) || inputClValue === 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);

      return;
    }

    //[7.3]
    sendData(inputClValue, modalCenterlineDatas, props.machineNumber);

    // if (validation) {
    //   props.onClose();
    //   props.deviation();
    //   return;
    // }

    //postValidData();
    props.onClose();
    props.onCheck(error);
    props.deviation();
    dispatch(validationSlice.actions.sendCheckTrueHandler());
  };

  return (
    <Fragment>
      {!error && (
        <BasicModal
          onClose={props.onClose}
          onOpen={props.open}
          portalElement={portalElement}
        >
          <Typography
            variant="h6"
            id="centerline-modal"
            sx={componentStyle.typhografTitle}
          >
            Írd be a mért Centerline értéket
          </Typography>
          <Typography variant="subtitle2">
            {modalCenterlineDatas.clName}
          </Typography>
          <Box sx={componentStyle.textFieldBox}>
            <TextField
              sx={componentStyle.inputField}
              margin="normal"
              size="small"
              id="filled-number"
              label="Mért érték"
              type="number"
              inputRef={inputData}
              InputLabelProps={{
                shrink: true,
              }}
              variant="standard"
            />
            <Typography variant="subtitle2">
              {modalCenterlineDatas.measure}
            </Typography>
          </Box>
          <Box sx={componentStyle.buttonBox}>
            <Button
              variant="contained"
              sx={componentStyle.button}
              onClick={sendingDataHandler}
              size="small"
            >
              Küldés
            </Button>
            <Button
              variant="outlined"
              sx={componentStyle.escButton}
              onClick={props.onClose}
              size="small"
            >
              Kilépés
            </Button>
          </Box>
        </BasicModal>
      )}
      {error && <ErrorModal error={error} open={props.open} />}
      {!validation && <CenterlineDeviationModal />}
    </Fragment>
  );
};

export default CenterlineCheckModal;
