/**
 * Funkciója:
 *     - a Centerline Listák menüpont
 *     - A kiválasztott gépszám és centerline típus után itt jelenítődik meg az adatbázisből lekért adatok
 *       egy táblázat segítségével
 *
 * useState Hooks:
 * [1] - a kijelölt adatokat tárolja
 * [2] - centerline típus lekéréséhez és beállításához
 * [3] - a kiválasztot lista adatait tárolja
 * [4] - a táblázat
 * [5] - egy másik fajta táblázathoz megadja a táblázat "címét" ami a gépszám
 * [6] - tárolja a kiválasztott lista elemet
 *
 * function:
 * [1] - a kijelölt gépszám alapján kigyűjti a hozzá tartozó centerline típusokat
 * [2] - a kíválasztott centerline típushoz tartozó centerline értékeket gyűjti ki
 */

import React, { Fragment, useState, useEffect } from "react";

import CenterlineTables from "../Components/Table/CenterlineTables";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { fetchCenterlineList } from "../store/centerlineList-actions";
import centerlineListSlice from "../store/centerlineList-slice";
import titleSlice from "../store/title-slice";

import Selections from "../hooks/selections";

const style = {
  formControlBox: {
    width: "100%",
    mt: "7rem",
  },
  formControl: {
    m: "1rem",
    width: "150px",
    maxWidth: "300px",
  },
  buttonBox: {
    mt: "1rem",
    m: "1rem",
  },
  circulasProg: {
    textAlign: "center",
    mt: 2,
  },
};

const CenterlineList = () => {
  const [centerlines, setCenterlines] = useState(); //[1]
  const [centerlineTypes, setCenterlineTypes] = useState([]); //[2]
  const [clDatas, setClDatas] = useState(); //[3]
  const [selectedMachineNumber, setSelectedMachineNumber] = useState(); //[4]
  const [tableTitle, setTableTitle] = useState(); //[5]
  const [selectedCenterlineList, setSelectedCenterlineList] = useState(); //[6]

  const { typesFromMachine: selectedMachine, selectedList } = Selections();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCenterlineList());
    dispatch(titleSlice.actions.setTitle("Centerline listák"));

    return () => {
      dispatch(centerlineListSlice.actions.clearCenterlineDatas());
      dispatch(centerlineListSlice.actions.clearMachineNumbers());
    };
  }, [dispatch]);

  const machineNumbersFromRedux = useSelector(
    (state) => state.centerlineList.machineNumbers
  );

  const isLoading = useSelector((state) => state.checkLoading.loading);

  //[1]
  const typeHandler = (event) => {
    const { cltypes, selectedCenterlineData, machine } = selectedMachine(event);
    setCenterlineTypes(cltypes);
    setCenterlines(selectedCenterlineData);
    setSelectedMachineNumber(machine);
  };

  //[2]
  const selectedListHandler = () => {
    const { datasOfCl } = selectedList(centerlines, selectedCenterlineList);

    setClDatas(datasOfCl);
    setTableTitle(selectedCenterlineList);
  };

  return (
    <Fragment>
      <Box display="flex" sx={style.formControlBox}>
        <FormControl sx={style.formControl}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Gépszám
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "machineNumber",
              id: "machineNumber",
            }}
            onChange={typeHandler}
          >
            <option value={null}>---</option>
            {machineNumbersFromRedux.map((numbers) => (
              <option key={numbers} value={numbers}>
                {numbers}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <FormControl sx={style.formControl}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Centerline Típus
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: "machineType",
              id: "machineType",
            }}
            onChange={(event) => setSelectedCenterlineList(event.target.value)}
          >
            <option value={null}>---</option>
            {centerlineTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
        <Box sx={style.buttonBox}>
          <Button variant="contained" onClick={selectedListHandler}>
            Keresés
          </Button>
        </Box>
      </Box>
      {isLoading && (
        <Box sx={style.circulasProg}>
          <CircularProgress size={60} />
        </Box>
      )}
      {clDatas !== undefined && isLoading === false && (
        <CenterlineTables
          machineNumber={selectedMachineNumber}
          tableTitle={tableTitle}
          clDatas={clDatas}
        />
      )}
    </Fragment>
  );
};

export default CenterlineList;
