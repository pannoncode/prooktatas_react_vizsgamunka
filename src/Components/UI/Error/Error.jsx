import * as React from "react";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const style = {
  width: "100%",
  mt: ".5rem",
};

const Error = (props) => {
  return (
    <Stack sx={style} spacing={2}>
      <Alert variant="filled" severity={props.severity}>
        {props.content}
      </Alert>
    </Stack>
  );
};

export default Error;
