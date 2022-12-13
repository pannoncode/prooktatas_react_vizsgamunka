import React from "react";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";

const style = {
  formControl: {
    m: "1rem",
    width: "150px",
    maxWidth: "300px",
  },
};

const SelectList = (props) => {
  const inputData = props.data;

  return (
    <FormControl sx={style.formControl}>
      <InputLabel variant={props.variant} htmlFor="uncontrolled-native">
        {props.title}
      </InputLabel>
      <NativeSelect
        defaultValue={30}
        inputProps={{
          name: `${props.name}`,
          id: `${props.id}`,
        }}
        onChange={props.onChange}
      >
        <option value={null}>---</option>
        {inputData.map((numbers) => (
          <option key={numbers} value={numbers}>
            {numbers}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default SelectList;
