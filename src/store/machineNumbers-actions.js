import { machineNumbersActions } from "./machineNumbers-slice";
import { loadingActions } from "./checkloading-slice";

export const getAllMachineNumbersFromDb = () => {
  return async (dispatch) => {
    const getData = async () => {
      dispatch(loadingActions.isNotError());
      dispatch(loadingActions.isLoading());
      const response = await fetch(
        "https://projectcenterlines-default-rtdb.europe-west1.firebasedatabase.app/machineNumbers.json"
      );

      if (!response.ok) {
        throw new Error("Sikertelen lista lekérés");
      }

      const data = await response.json();
      return data;
    };
    try {
      dispatch(loadingActions.isLoading());
      const machineNumbers = await getData();
      dispatch(machineNumbersActions.getAllMachineNumbers(machineNumbers));
      dispatch(machineNumbersActions.getMachineNumbers(machineNumbers));
    } catch (error) {
      console.log(error.message);
      dispatch(loadingActions.isError());
    }
    dispatch(loadingActions.isNotLoading());
    dispatch(loadingActions.isNotError());
  };
};
