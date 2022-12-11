/**
 * Funkciója:
 *  - A CenterlineCheckModal.jsx-ben bevitt értéket ellenőrzi
 *  - a targetValidation ellenőrzi, hogy a csak Cél (target)-el rendelkező listaelemek
 *    eltérnek e a target-től vagy targeten vannak
 *  - a minMaxValidation az olyan listaelemeket ellenőrzi amiben van minimum/target/maximum
 *    érték is
 *  - ellenőrzés után az eredményeket továbbküldi
 */

const CenterlineValidation = () => {
  let targets = {
    target: "OK",
    outTarget: "NOK",
  };
  let result;

  const targetValidation = (clvalue, cltarget) => {
    if (clvalue >= cltarget && clvalue <= cltarget) {
      return (result = targets.target);
    } else {
      return (result = targets.outTarget);
    }
  };

  const minMaxValidation = (min, max, clvalue) => {
    if (clvalue >= min && clvalue <= max) {
      return (result = targets.target);
    } else {
      return (result = targets.outTarget);
    }
  };
  return { targetValidation, minMaxValidation, result };
};

export default CenterlineValidation;
