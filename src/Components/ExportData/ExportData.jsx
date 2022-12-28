import React from "react";

import { Typography, Button } from "@mui/material";
import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";

import * as XLSX from "xlsx";

const style = {
  captionContent: {
    // ml: "1rem",
  },
  saveIcon: {
    //   mt: "3rem",
    //   ml: "1rem",
    //   "&:hover": {
    //     cursor: "pointer",
    //},
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
    <Box sx={{ m: "1rem" }}>
      <Button
        variant="contained"
        endIcon={<DownloadIcon />}
        onClick={exportExcelHandler}
      >
        {props.content}
        {/* <Typography variant="overline" sx={style.captionContent}>
        {props.content}
      </Typography> */}
        {/* <DownloadIcon
        color="primary"
        sx={style.saveIcon}
        onClick={exportExcelHandler}
      /> */}
      </Button>
    </Box>
  );
};

export default ExportData;
