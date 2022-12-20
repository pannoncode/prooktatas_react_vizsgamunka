const centerlineDeviationValidation = (name, sku, reason) => {
  console.log(name);
  console.log(sku);
  console.log(reason);
  if (name === "" || name.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null) {
    console.log("hiba: " + name);
    return false;
  }

  if (isNaN(sku)) {
    console.log("hiba: " + sku);
    return false;
  }

  if (reason === "" || reason.match(/[.*+?<>^${}()|[\]\\]/g, "\\$&") !== null) {
    console.log("hiba: " + reason);
    return false;
  }

  return true;
};

export default centerlineDeviationValidation;
