/**
 * Funkciója:
 *   - Validálások után itt épül fel, hogy milyen adatok fognak tárolódni az adatbázisban és ezek az adatok
 *     itt kerülnek POST-olásra
 */

import { postData } from "../store/postCenterlineData-actions";
import TimeStamp from "./timestamp";
import CenterlineValidation from "./centerlineValueValidation";

import validationSlice from "../store/validation-slice";
import { useDispatch } from "react-redux";

const SendingData = () => {
  const { targetValidation, minMaxValidation } = CenterlineValidation();
  const dispatch = useDispatch();
  let validation;

  const validateData = (inputClValue, modalCenterlineDatas, machineNumber) => {
    if (
      modalCenterlineDatas.min === null &&
      modalCenterlineDatas.max === null
    ) {
      validation = targetValidation(inputClValue, modalCenterlineDatas.target);
    } else if (
      modalCenterlineDatas.min !== null &&
      modalCenterlineDatas.max !== null
    ) {
      validation = minMaxValidation(
        modalCenterlineDatas.min,
        modalCenterlineDatas.max,
        inputClValue
      );
    }

    modalCenterlineDatas.time = TimeStamp();
    modalCenterlineDatas.checkedValue = inputClValue;
    modalCenterlineDatas.machineNumber = machineNumber;
    modalCenterlineDatas.validate = validation;

    console.log(modalCenterlineDatas);
    dispatch(validationSlice.actions.getPostData(modalCenterlineDatas));
  };

  const postingValidatedData = (data) => {
    console.log("most postolok");
    postData(
      "https://projectcenterlines-default-rtdb.europe-west1.firebasedatabase.app/centerlinedifferent.json/",
      "POST",
      {
        data,
      }
    );
  };

  return { validateData, postingValidatedData };
};

export default SendingData;
