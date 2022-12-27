/**
 * Funkciója:
 *      - Centerline lista létrehozása oldalon található "Lisa létrehozása" gombra kattintva bejövő Modal,
 *        ami egy lista létrehozásához szükséges adatok beviteléhez jeleníti meg a mezőket
 *
 * Felépítése:
 * [1]  - a legördülő menüben kiválasztot gépszámot tárolja
 * [2]  - a legördülő menüben kiválasztot centerline típust tárolja
 * [3]  - a Modal ide van bekötve a megjelenéshez
 * [4]  - centerlinelistValidation.js-ben található validálás
 * [5]  - a hibakezeléshez létrehozott errorFeedback-slice.js-ben található error state true-false állapota
 *        ami a centerlinelistValidation.js-ban van változtatva
 * [6]  - a hibakezeléshez létrehozott errorFeedback-slice.js-ben található content state amibe a centerlinelistValidation.js
 *        validáláskor jövő hibaüzenetek vannak tárolva
 * [7]  - onChange eseményre a kiválasztot gépszámnál kerül meghívásra és allítja be a [1] található useState segítségével a
 *        gépszám
 * [8]  - onChange eseményre a kiválasztot centerlin típusnál kerül meghívásra és allítja be a [2] található useState segítségével a
 *        a centerline típus
 * [9]  - összegyűjti az összes bevitt adatot és "továbbküldi" validálásra és adatbázisba küldésre
 * [10] - sikeres validálás után [10.1] az összegyűjtött adatokat az adatbázisba küldi
 */
import React, { useRef, useState } from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import NativeSelect from "@mui/material/NativeSelect";

import BasicModal from "./Modal";

import { postData } from "../../store/postCenterlineData-actions";
import centerlineValidation from "../../hooks/centerlinelistValidation";
import errorFeedbackSlice from "../../store/errorFeedback-slice";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const style = {
  textfield: {
    mt: ".5rem",
    mx: "3rem",
    width: "25rem",
  },
  box: {
    mt: "1rem",
  },
  buttonBox: {
    mt: "1rem",
  },
  spanTypo: {
    color: "red",
  },
  button: {
    mx: "1rem",
  },
  escButton: {
    mx: "1rem",
    backgroundColor: "white",
  },
  natSel: {
    mt: "1rem",
    width: "25rem",
  },
};

const CreateCenterlineModal = (props) => {
  const [machineNumber, setMachineNumber] = useState(); //[1]
  const [selectedClType, setSelectedClType] = useState(); //[2]

  const dispatch = useDispatch();

  const portalElement = document.getElementById("modal-root"); //[3]
  const { validations } = centerlineValidation(); //[4]

  const isError = useSelector((state) => state.errorFeedback.error); //[5]
  const errorContent = useSelector((state) => state.errorFeedback.content); //[6]

  let machineNumbers = props.machineNumbers;
  let cltypes = props.clTypes;
  let postClData = {};

  const machineNumberRef = useRef();
  const partOfMachineRef = useRef();
  const clNameRef = useRef();
  const checkRef = useRef();
  const qaCriticsRef = useRef();
  const minTargetRef = useRef();
  const targetRef = useRef();
  const maxTargetRef = useRef();
  const measureRef = useRef();
  const oplNumberRef = useRef();
  const checkTimeRef = useRef();

  //[7]
  const selectMachineNumberHandler = (event) => {
    setMachineNumber(parseInt(event.target.value));
  };

  //[8]
  const selectClTypeHandler = (event) => {
    setSelectedClType(event.target.value);
  };

  //[9]
  const collectCenterlineDataAndSend = () => {
    postClData = {
      id: Math.random() * 13,
      machineNumber: machineNumber,
      partOfMachine: partOfMachineRef.current.value,
      clName: clNameRef.current.value,
      check: checkRef.current.value,
      qaCritics: qaCriticsRef.current.value,
      minTarget: parseFloat(minTargetRef.current.value.replace(",", "."))
        ? parseFloat(minTargetRef.current.value.replace(",", "."))
        : "",
      target: parseFloat(targetRef.current.value.replace(",", ".")),
      maxTarget: parseFloat(maxTargetRef.current.value.replace(",", "."))
        ? parseFloat(maxTargetRef.current.value.replace(",", "."))
        : "",
      measure: measureRef.current.value,
      oplNumber: oplNumberRef.current.value,
      checkTime: checkTimeRef.current.value,
      typeNameofCl: selectedClType,
    };

    postAndValidation(postClData);
  };

  //[10]
  const postAndValidation = (postClData) => {
    //[10.1]
    if (validations(machineNumber, selectedClType, postClData)) {
      return;
    }

    dispatch(errorFeedbackSlice.actions.isNotError());

    postData(
      "https://projectcenterlines-default-rtdb.europe-west1.firebasedatabase.app/newcenterlines.json",
      "POST",
      {
        machineNumber: machineNumber,
        cltype: selectedClType,
        datas: postClData,
      }
    );

    props.onClose(true);
  };

  return (
    <BasicModal
      onOpen={props.open}
      onClose={props.exit}
      portalElement={portalElement}
    >
      <Typography variant="h6">Centerline lista létrehozása</Typography>
      <Typography variant="caption" sx={style.spanTypo}>
        {!isError ? "A * jelölt mezők kitöltése kötelező" : errorContent}
      </Typography>
      <Box>
        <Box>
          <NativeSelect
            error={isError}
            sx={style.natSel}
            defaultValue={30}
            inputProps={{
              name: "machineNumber",
              id: "machineNumber",
            }}
            onChange={selectMachineNumberHandler}
          >
            <option value={null}>Gépszám kiválasztása</option>
            {machineNumbers.map((element) => (
              <option key={element} value={element} ref={machineNumberRef}>
                {element}
              </option>
            ))}
          </NativeSelect>
        </Box>
        <Box>
          <NativeSelect
            error={isError}
            sx={style.natSel}
            defaultValue={30}
            inputProps={{
              name: "cltype",
              id: "cltype",
            }}
            onChange={selectClTypeHandler}
          >
            <option value={null}>Centerline típus kiválasztása</option>
            {cltypes.map((element) => (
              <option key={element} value={element} ref={machineNumberRef}>
                {element}
              </option>
            ))}
          </NativeSelect>
        </Box>
        <TextField
          required
          error={isError}
          sx={style.textfield}
          id="partOfMachine"
          label="Géprész"
          variant="standard"
          inputRef={partOfMachineRef}
        />
        <TextField
          required
          error={isError}
          sx={style.textfield}
          id="clName"
          label="Centerline neve"
          variant="standard"
          inputRef={clNameRef}
        />
        <TextField
          required
          error={isError}
          sx={style.textfield}
          id="check"
          label="Futó/Álló"
          variant="standard"
          inputRef={checkRef}
        />
        <TextField
          required
          error={isError}
          sx={style.textfield}
          id="qaCritics"
          label="QA kritikus"
          variant="standard"
          inputRef={qaCriticsRef}
        />
        <TextField
          sx={style.textfield}
          type="number"
          id="minTarget"
          label="Minimum"
          variant="standard"
          inputRef={minTargetRef}
        />
        <TextField
          required
          error={isError}
          sx={style.textfield}
          type="number"
          id="target"
          label="Cél"
          variant="standard"
          inputRef={targetRef}
        />
        <TextField
          sx={style.textfield}
          type="number"
          id="maxTarget"
          label="Maximum"
          variant="standard"
          inputRef={maxTargetRef}
        />
        <TextField
          required
          error={isError}
          sx={style.textfield}
          id="measure"
          label="Mértékegység"
          variant="standard"
          inputRef={measureRef}
        />
        <TextField
          sx={style.textfield}
          id="oplNumber"
          label="OPL szám"
          variant="standard"
          inputRef={oplNumberRef}
        />
        <TextField
          required
          error={isError}
          sx={style.textfield}
          id="checkTime"
          label="Ellenőrzés ideje"
          variant="standard"
          inputRef={checkTimeRef}
        />
      </Box>
      <Box sx={style.box}>
        <Button
          sx={style.button}
          variant="contained"
          onClick={collectCenterlineDataAndSend}
        >
          Küldés
        </Button>
        <Button
          variant="outlined"
          sx={style.escButton}
          onClick={props.exit}
          size="small"
        >
          Kilépés
        </Button>
      </Box>
    </BasicModal>
  );
};

export default CreateCenterlineModal;
