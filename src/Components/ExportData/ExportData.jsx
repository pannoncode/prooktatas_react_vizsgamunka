import React from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

import * as XLSX from "xlsx";

const style = {
  captionContent: {
    ml: "1rem",
  },
  saveIcon: {
    mt: "3rem",
    ml: "1rem",
    "&:hover": {
      cursor: "pointer",
    },
  },
};

const ExportData = (props) => {
  const exportExcelHandler = () => {
    const worksheet = XLSX.utils.json_to_sheet(props.exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${props.fileName}.xlsx`);
  };

  return (
    <Box>
      <Typography variant="overline" sx={style.captionContent}>
        {props.content}
      </Typography>
      <SaveAltIcon
        color="primary"
        sx={style.saveIcon}
        onClick={exportExcelHandler}
      />
    </Box>
  );
};

export default ExportData;
