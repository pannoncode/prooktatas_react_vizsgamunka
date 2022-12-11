import { centerlineTypesActions } from "./centerlineTypes-slice";
import { loadingActions } from "./checkloading-slice";

export const getAllCenterlineTypes = () => {
  return async (dispatch) => {
    const getData = async () => {
      dispatch(loadingActions.isNotError());
      dispatch(loadingActions.isLoading());
      const response = await fetch(
        "https://projectcenterlines-default-rtdb.europe-west1.firebasedatabase.app/centerlintypes.json"
      );

      if (!response.ok) {
        throw new Error("Sikertelen lista lekérés");
      }

      const data = await response.json();
      return data;
    };
    try {
      dispatch(loadingActions.isLoading());
      const centerlinetypes = await getData();
      dispatch(centerlineTypesActions.getClTypes(centerlinetypes));
      dispatch(centerlineTypesActions.getAllClTypes(centerlinetypes));
    } catch (error) {
      console.log(error.message);
      dispatch(loadingActions.isError());
    }
    dispatch(loadingActions.isNotLoading());
    dispatch(loadingActions.isNotError());
  };
};
