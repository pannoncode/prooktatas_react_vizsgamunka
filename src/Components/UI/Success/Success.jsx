import * as React from "react";

import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const style = {
  stack: {
    width: "100%",
    mt: ".5rem",
  },
};

const Success = (props) => {
  return (
    <Stack sx={style.stack} spacing={2}>
      <Alert variant="filled" severity={props.severity}>
        {props.content}
      </Alert>
    </Stack>
  );
};

export default Success;
