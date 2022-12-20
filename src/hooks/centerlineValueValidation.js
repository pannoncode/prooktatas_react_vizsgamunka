/**
 * Funkciója:
 *  - A CenterlineCheckModal.jsx-ben bevitt értéket ellenőrzi
 *  - a targetValidation ellenőrzi, hogy a csak Cél (target)-el rendelkező listaelemek
 *    eltérnek e a target-től vagy targeten vannak
 *  - a minMaxValidation az olyan listaelemeket ellenőrzi amiben van minimum/target/maximum
 *    érték is
 *  - ellenőrzés után az eredményeket továbbküldi
 */

import { useDispatch } from "react-redux";
import validationSlice from "../store/validation-slice";

const CenterlineValidation = () => {
  const dispatch = useDispatch();

  let targets = {
    target: "OK",
    outTarget: "NOK",
  };
  let result;

  const targetValidation = (clvalue, cltarget) => {
    if (clvalue >= cltarget && clvalue <= cltarget) {
      dispatch(validationSlice.actions.validationOk());
      return (result = targets.target);
    } else {
      dispatch(validationSlice.actions.validationNok());
      return (result = targets.outTarget);
    }
  };

  const minMaxValidation = (min, max, clvalue) => {
    if (clvalue >= min && clvalue <= max) {
      dispatch(validationSlice.actions.validationOk());
      return (result = targets.target);
    } else {
      dispatch(validationSlice.actions.validationNok());
      return (result = targets.outTarget);
    }
  };
  return { targetValidation, minMaxValidation, result };
};

export default CenterlineValidation;
