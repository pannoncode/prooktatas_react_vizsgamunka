import { Fragment } from "react";
import { createPortal } from "react-dom";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  maxHeight: "90vh",
  overflowY: "auto",
};

const BasicModal = (props) => {
  return (
    <Fragment>
      {createPortal(
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={props.onOpen}
          onClose={props.onClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 1000,
          }}
        >
          <Fade in={props.onOpen}>
            <Box sx={style}>{props.children}</Box>
          </Fade>
        </Modal>,
        props.portalElement
      )}
    </Fragment>
  );
};

export default BasicModal;
