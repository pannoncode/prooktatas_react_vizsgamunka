/**
 * Funkciója:
 *   - Validálások után itt épül fel, hogy milyen adatok fognak tárolódni az adatbázisban és ezek az adatok
 *     itt kerülnek POST-olásra
 */

import { postData } from "../store/postCenterlineData-actions";
import TimeStamp from "./timestamp";
import CenterlineValidation from "./centerlineValueValidation";

const SendingData = () => {
  const { targetValidation, minMaxValidation } = CenterlineValidation();
  let validation;

  const postValidateData = (
    inputClValue,
    modalCenterlineDatas,
    machineNumber
  ) => {
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

    postData(
      "https://projectcenterlines-default-rtdb.europe-west1.firebasedatabase.app/centerlinedifferent.json/",
      "POST",
      {
        modalCenterlineDatas,
      }
    );
  };

  return { postValidateData };
};

export default SendingData;
