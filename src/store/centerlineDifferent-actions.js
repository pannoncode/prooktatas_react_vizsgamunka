import { centerlineListActions } from "./centerlineList-slice";
import { loadingActions } from "./checkloading-slice";

export const fetchCenterlineDifferent = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(loadingActions.isLoading());
      const response = await fetch(
        "https://projectcenterlines-default-rtdb.europe-west1.firebasedatabase.app/centerlinedifferent.json"
      );

      if (!response.ok) {
        throw new Error("Sikertelen lista lekérés");
      }

      const data = await response.json();
      return data;
    };
    try {
      dispatch(loadingActions.isLoading());
      const centerlineDifferent = await fetchData();
      dispatch(
        centerlineListActions.getCenterlineDifferent(centerlineDifferent)
      );
    } catch (error) {
      console.log(error.message);
    }
    dispatch(loadingActions.isNotLoading());
  };
};
