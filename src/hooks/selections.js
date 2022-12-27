/**
 * Funkciója:
 *  - a CenterlineList.jsx-ből hívódik be. A legördülő menüből jövő gépszámot és centerline típust kezeli le
 *  - ezeknek a segítségével a táblázatban (Centerline listák menüpont) az adott gépszámhoz és centerline típussal
 *    rendelkező adatok kerülnek szűrésre és megjelenítésre az adatbázisból
 */

import { useSelector } from "react-redux";

const Selections = () => {
  const centerlineDataFromRedux = useSelector(
    (state) => state.centerlineList.centerlineDatas
  );

  const typesFromMachine = (event) => {
    const cltypes = [];
    const selectedCenterlineData = [];
    const machine = parseInt(event.target.value);

    for (const item of centerlineDataFromRedux) {
      if (item.machineNumber === machine) {
        if (!cltypes.includes(item.cltype)) {
          cltypes.push(item.cltype);
        }
        selectedCenterlineData.push(item.datas);
      }
    }

    return {
      cltypes,
      selectedCenterlineData,
      machine,
    };
  };

  const selectedList = (centerlines, selectType) => {
    const datasOfCl = [];

    for (const key in centerlines) {
      // gyengébre kellett vennem az ellenőrzést a szám CL típus miatt
      if (selectType == centerlines[key].typeNameofCl) {
        datasOfCl.push(centerlines[key]);
      }
    }
    return { datasOfCl };
  };

  return { typesFromMachine, selectedList };
};

export default Selections;
