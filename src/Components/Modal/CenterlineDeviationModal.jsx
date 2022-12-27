import React, { useRef } from "react";

import BasicModal from "./Modal";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";

import SendingData from "../../hooks/sendCheckedClData";
import centerlineDeviationValidation from "../../hooks/centerlineDeviationValidation";

import validationSlice from "../../store/validation-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

const CenterlineDeviationModal = (props) => {
  const [error, setError] = useState(false);
  const portalElement = document.getElementById("modal-root");
  const nameRef = useRef();
  const skuRef = useRef();
  const reasonDevRef = useRef();

  const { postingValidatedData: sendData } = SendingData();
  const dispatch = useDispatch();
  let reasonDevObj = {};

  const postingData = useSelector((state) => state.validation.postData);

  console.log(postingData);

  const sendButtonHandler = () => {
    const checkerName = nameRef.current.value;
    const sku = skuRef.current.value;
    const reasonDev = reasonDevRef.current.value;

    if (!centerlineDeviationValidation(checkerName, sku, reasonDev)) {
      setError(true);
      return;
    }

    reasonDevObj = {
      name: checkerName,
      sku: sku,
      reason: reasonDev,
    };

    let results = {
      ...postingData,
      ...reasonDevObj,
    };

    sendData(results);
    dispatch(validationSlice.actions.validationOk());
    dispatch(validationSlice.actions.clearPostData());
    props.onClose();
  };
  return (
    <BasicModal
      onOpen={props.open}
      onClose={props.exit}
      portalElement={portalElement}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "99%" },
        }}
        noValidate
        autoComplete="off"
      >
        <Box sx={{ mb: 1 }}>
          <Typography variant="h5">Centerline eltérés riport</Typography>
          <Typography variant="caption" sx={{ color: "red" }}>
            * minden mező kitöltése kötelező
          </Typography>
        </Box>
        <TextField
          id="name"
          label="Név"
          variant="outlined"
          error={error}
          inputRef={nameRef}
        />
        <TextField
          id="sku"
          label="SKU"
          type="number"
          variant="outlined"
          error={error}
          inputRef={skuRef}
        />
        <TextField
          id="dev-reason"
          label="Eltérés oka"
          error={error}
          multiline
          rows={10}
          sx={{ width: "300px" }}
          inputRef={reasonDevRef}
        />
      </Box>

      <Button variant="contained" color="primary" onClick={sendButtonHandler}>
        Küldés
      </Button>
    </BasicModal>
  );
};

export default CenterlineDeviationModal;
