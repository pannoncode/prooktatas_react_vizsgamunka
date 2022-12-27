import React, { Fragment } from "react";

import TableAlt from "./TableAlt";

const CenterlineTables = (props) => {
  const centerlineDatas = props.clDatas;
  const machineNumber = props.machineNumber;
  const tableTitle = props.tableTitle;

  const columns = [
    {
      field: "id",
      headerName: "NoCl",
      headerClassName: "headerStyle",
      width: 90,
    },
    {
      field: "partOfMachine",
      headerName: "Géprész",
      headerClassName: "headerStyle",
      width: 130,
    },
    {
      field: "clName",
      headerName: "Centerline neve",
      headerClassName: "headerStyle",
      width: 530,
    },
    {
      field: "check",
      headerName: "Futó/Álló",
      headerClassName: "headerStyle",
      width: 130,
    },
    {
      field: "qa",
      headerName: "QA kritikus",
      headerClassName: "headerStyle",
      width: 90,
    },
    {
      field: "min",
      headerName: "Minimum",
      headerClassName: "headerStyle",
      width: 90,
    },
    {
      field: "target",
      headerName: "Cél",
      headerClassName: "headerStyle",
      width: 70,
    },
    {
      field: "max",
      headerName: "Maximum",
      headerClassName: "headerStyle",
      width: 90,
    },
    {
      field: "measure",
      headerName: "Mértékegység",
      headerClassName: "headerStyle",
      width: 110,
    },
    {
      field: "opl",
      headerName: "OPL szám",
      headerClassName: "headerStyle",
      width: 130,
    },
    {
      field: "checTime",
      headerName: "Ellenőrzés ideje",
      headerClassName: "headerStyle",
      width: 130,
    },
  ];

  let rows = centerlineDatas.map((row, id) => ({
    key: id,
    id: id + 1,
    partOfMachine: row.partOfMachine,
    clName: row.clName,
    check: row.check,
    qa: row.qaCritics,
    min: row.minTarget,
    target: row.target,
    max: row.maxTarget,
    measure: row.measure,
    opl: row.oplNumber,
    checTime: row.checkTime,
  }));

  return (
    <Fragment>
      <TableAlt
        clDatas={centerlineDatas}
        rows={rows}
        columns={columns}
        tableTitle={tableTitle}
        machineNumber={machineNumber}
      />
    </Fragment>
  );
};

export default CenterlineTables;
