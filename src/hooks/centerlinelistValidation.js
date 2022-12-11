/**
 * Funkciója:
 *  - A Centerline lista létrehozása menüpontnál található Lista létehozásánál a bevitt adatok itt kerülnek validálásra
 *  - A hibától függően kerül visszajelzés
 *  - Az errorFeedbackSlice.js ben tárolt state-ek content tartalma itt kerülnek módosításra
 */

import errorFeedbackSlice from "../store/errorFeedback-slice";
import { useDispatch } from "react-redux";

const useCenterlineValidation = () => {
  const dispatch = useDispatch();

  const validations = (machineNumber, cltype, postDataObj) => {
    if (machineNumber === undefined) {
      dispatch(errorFeedbackSlice.actions.isError("Nincs gépszám kiválasztva"));
      return true;
    }

    if (cltype === undefined) {
      dispatch(
        errorFeedbackSlice.actions.isError("Nincs Centerline típus kiválasztva")
      );
      return true;
    }

    if (
      postDataObj.partOfMachine === "" ||
      postDataObj.partOfMachine.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null
    ) {
      dispatch(
        errorFeedbackSlice.actions.isError("Nincs a Géprész mező kitöltve")
      );
      return true;
    } else if (
      postDataObj.clName === "" ||
      postDataObj.clName.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null
    ) {
      dispatch(
        errorFeedbackSlice.actions.isError(
          "Nincs a Centerline neve mező kitöltve"
        )
      );
      return true;
    } else if (
      postDataObj.check === "" ||
      postDataObj.check.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null
    ) {
      dispatch(
        errorFeedbackSlice.actions.isError("Nincs a Futó/Álló mező kitöltve")
      );
      return true;
    } else if (
      postDataObj.qaCritics === "" ||
      postDataObj.qaCritics.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null
    ) {
      dispatch(
        errorFeedbackSlice.actions.isError("Nincs a QA kritikus mező kitöltve")
      );
      return true;
    } else if (postDataObj.minTarget === "-" || isNaN(postDataObj.minTarget)) {
      dispatch(
        errorFeedbackSlice.actions.isError("Nincs a Minimum mező kitöltve")
      );
      return true;
    } else if (isNaN(postDataObj.target)) {
      dispatch(errorFeedbackSlice.actions.isError("Nincs a Cél mező kitöltve"));
      return true;
    } else if (isNaN(postDataObj.maxTarget) && postDataObj.maxTarget !== "") {
      dispatch(
        errorFeedbackSlice.actions.isError("Nincs a Maximum  mező kitöltve")
      );
      return true;
    } else if (
      postDataObj.measure === "" ||
      postDataObj.measure.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null
    ) {
      dispatch(
        errorFeedbackSlice.actions.isError("Nincs a Mértékegység mező kitöltve")
      );
      return true;
    } else if (
      postDataObj.oplNumber.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null
    ) {
      dispatch(
        errorFeedbackSlice.actions.isError("Nincs a OPL szám mező kitöltve")
      );
      return true;
    } else if (
      postDataObj.checkTime === "" ||
      postDataObj.checkTime.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null
    ) {
      dispatch(
        errorFeedbackSlice.actions.isError(
          "Nincs az Ellenőrzés ideje mező kitöltve"
        )
      );
      return true;
    }

    return false;
  };

  return { validations };
};

export default useCenterlineValidation;
