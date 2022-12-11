import React from "react";

import BasicModal from "./Modal";
import Error from "../UI/Error/Error";

const ErrorModal = (props) => {
  const portalElement = document.getElementById("modal-root");

  return (
    <BasicModal
      onOpen={props.error}
      onClose={props.onClose}
      portalElement={portalElement}
    >
      <Error content="Hibásan bevitt érték" severity="error" />
    </BasicModal>
  );
};

export default ErrorModal;
